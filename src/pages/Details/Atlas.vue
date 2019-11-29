<template>
  <div class="page-transition-enter-done">
    <div class="page-wrap">
      <div class="page-user">
        <div class="user-wrap">
          <div class="img-wrap" :id="arr.sender?arr.sender.id:''">
            <img
              :src="arr.sender?arr.sender.avatar:''"
              alt
              style="width: 40px; height: 40px; margin: 0px 6px 0px 0px; border-radius: 50%;"
            />
          </div>
          <div class="name-wrap">
            <h3
              class="user-name"
              :id="arr.sender?arr.sender.id:''"
            >{{arr.sender?arr.sender.username:''}}</h3>
            <div class="user-time">
              <span>{{time}}</span>
              <i>·</i>
              <span>浏览 {{arr.visit_count}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="page-main">
        <h2>{{arr.desc}}</h2>
        <ul>
          <li v-for="(img,index) in imgs" :key="index" @click="GoDetail(img.id)">
            <img :src="img.photo.path" />
          </li>
        </ul>
      </div>
      <div class="page-zj">
        <div class="zj-wrap" @click="Goalbum(arr.album?arr.album.id:'')">
          <div class="zj-img">
            <img
              :src="arr.album?arr.album.covers:''"
              alt
              style="width: 60px; height: 60px; margin: 10px 8px 10px 10px; border-radius: 4px;"
            />
          </div>
          <div class="zj-main">
            <h3>收藏至专辑 {{arr.album?arr.album.name:''}}</h3>
            <div class="zj-count">
              {{arr.album?arr.album.count:''}}张图片&nbsp;
              <i></i>
              &nbsp;{{arr.album?arr.album.like_count:''}}人收藏
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-bot">
      <div class="bot-top">所有评论</div>
      <ul>
        <li v-for="(user,index) in userArr" :key="index">
          <div class="bot-img" @click="Gouser(user.sender.id)">
            <img :src="user.sender.avatar" />
          </div>
          <div class="bot-msg">
            <div class="msg-top" @click="Gouser(user.sender.id)">
              <span class="msg-user">{{user.sender.username}}</span>
              <span class="msg-time">{{user.create_time_str}}</span>
            </div>
            <div class="mst-bot">
              <p>{{user.content}}</p>
            </div>
          </div>
          <div class="zan">
            <span>
              <i></i>
              <em>{{user.like_count}}</em>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { get } from "utils/http";

export default {
  data() {
    return {
      arr: "",
      time: "",
      user: [],
      userArr: [],
      imgs: []
    };
  },
  async mounted() {},
  methods: {
    GoDetail(id) {
      this.$router.push(`/imgdetails/?id=${id}`);
    },
    Goalbum(id) {
      this.$router.push(`/album/?id=${id}`);
    },
    Gouser(id) {
      this.$router.push(`/user/?id=${id}`);
    },
    async getData() {
      let id = this.$route.query.id;
      let result = await get({
        url: `/napi/vienna/atlas/detail/`,
        params: {
          atlas_id: id
        }
      });
      this.arr = result.data;
      this.imgs = result.data.blogs;
      let now = new Date((this.arr.created_at / 1000)*1000);
      let Y = now.getFullYear() + "年";
      let M = now.getMonth() + 1 + "月";
      let D = now.getDay() + 1 + "日";
      this.time = Y + M + D;
    },
    async getBot() {
      let id = this.$route.query.id;
      let result = await get({
        url: `/napi/vienna/comment/list/`,
        params: {
          start: 0,
          limit: 24,
          more: 1,
          subject_type: 23,
          subject_id: id,
          topic_id: id
        }
      });
      this.userArr = result.data.object_list;
      //   console.log(this.userArr.created_at);
    }
  },
  created() {
    this.getData();
    this.getBot();
  }
};
</script>

<style lang='stylus' scoped>
.page-transition-enter-done {
  background-color: #fff;

  .page-user {
    padding: 0.2rem 0.2rem 0;

    .user-wrap {
      display: flex;
      justify-content: flex-start;
      flex-flow: row nowrap;

      .img-wrap {
        position: relative;
      }

      .name-wrap {
        h3 {
          margin: 0;
          line-height: 0.21rem;
          font-size: 0.15rem;
          font-weight: 700;
          color: #777;
        }

        .user-time {
          line-height: 0.17rem;
          font-size: 0.12rem;
          color: #ccc;
        }
      }
    }
  }

  .page-main {
    border-bottom: 0.01rem solid #f0f0f0;
    padding: 0 0 0.12rem;

    h2 {
      margin: 0.12rem 0.2rem 0;
      font-size: 0.16rem;
      font-weight: 400;
      color: #444;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }

    ul {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      box-sizing: border-box;
      margin: 0.1rem 0.15rem 0 0.2rem;
      padding-bottom: 0.14rem;

      li {
        margin-bottom: 0.05rem;
        margin-right: 0.05rem;
        width: 1.04rem;
        height: 1.04rem;
        line-height: 0.47rem;
        text-align: center;
        border-radius: 4px;
        box-sizing: border-box;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .page-zj {
    overflow: hidden;

    .zj-wrap {
      margin: 0.16rem 0.2rem 0;
      display: flex;
      flex-flow: row nowrap;
      -webkit-box-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      align-items: center;
      border: 1px solid #e6e6e6;
      border-radius: 6px;

      .zj-img {
        position: relative;
      }

      .zj-main {
        h3 {
          margin: 0;
          line-height: 0.21rem;
          font-size: 0.15rem;
          font-weight: 700;
          color: #777;
        }

        .zj-count {
          margin: 0.12rem 0 0;
          font-size: 0.14rem;
          color: #aaa;

          > i {
            margin: 0 0.04rem;
          }
        }
      }
    }
  }

  .page-bot {
    .bot-top {
      padding: 0.2rem 0.15rem 0.06rem;
      background-color: #fff;
      color: #777;
      font-size: 0.14rem;
    }

    ul>li {
      display: flex;
      padding: 0.15rem 0 0.15rem 0.15rem;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      .bot-img {
        position: relative;
        width: 36px;
        height: 36px;
        color: rgb(51, 51, 51);

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .bot-msg {
        position: relative;
        margin-left: 0.1rem;

        .msg-top {
          .msg-user {
            font-weight: 700;
            font-size: 0.13rem;
            padding-top: 0.02rem;
            line-height: 0.18rem;
            color: rgb(68, 68, 68);
          }

          .msg-time {
            display: block;
            line-height: 0.16rem;
            font-size: 0.11rem;
            color: rgb(170, 170, 170);
          }
        }

        .mst-bot {
          p {
            overflow-wrap: break-word;
            word-break: break-all;
            line-height: 0.24rem;
            padding-right: 0.15rem;
            font-size: 0.15rem;
            color: rgb(68, 68, 68);
          }
        }
      }

      .zan {
        span {
          padding-right: 0.15rem;
          position: absolute;
          top: 0.1rem;
          left: auto;
          right: 0px;
          display: flex;
          -webkit-box-pack: end;
          justify-content: flex-end;
          width: 0.8rem;
          height: 0.3rem;
          font-size: 0.13rem;
          color: rgb(170, 170, 170);
          margin: -0.08rem 0 0;

          i {
            width: 0.3rem;
            height: 0.3rem;
            background-image: url('https://c-ssl.duitang.com/uploads/people/201608/31/20160831103240_Br5RN.png'); // c-ssl.duitang.com/uploads/people/201608/31/20160831103240_Br5RN.png);
            background-size: 0.68rem 0.68rem;
            background-position: -104px -2px;
            animation: 0.3s ease 0s 1 normal none running zoom;
          }

          em {
            line-height: 0.13rem;
            font-size: 0.13rem;
            font-style: normal;
            color: rgb(170, 170, 170);
            margin: 0.1rem 0 0;
          }
        }
      }
    }
  }
}
</style>
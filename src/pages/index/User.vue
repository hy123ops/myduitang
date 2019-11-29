<template>
  <div class="page-transition">
    <div class="page-wrap">
      <div class="bg" :style="{backgroundImage: 'url('+arr.background_img_url+')'}"></div>
      <div class="bg-bottom"></div>
      <div class="user-detail">
        <span class="bg2">
          <img :src="arr.avatar" />
        </span>
        <h3 class="h3">{{arr.username}}</h3>
        <span
          class="fs"
        >关注 {{arr.follow_count}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;粉丝{{arr.be_follow_count}}</span>
        <span class="msg">{{arr.short_description}}</span>
      </div>
    </div>
    <div class="tab-wrap">
      <div class="tab-top">
        <div class="tab-top-wrap">
          <van-tabs v-model="active">
            <van-sticky :offset-top="45">
              <p class="score">获赞与被收藏{{arr.score}}次</p>
            </van-sticky>
            <van-tab title="动态">
              <div class="text-wrap">
                <div class="text1" v-for="(arr,index) in listArr" :key="index">
                  <div class="text1-top">
                    <span class="text1-bg" :id="arr.desc.sender.id">
                      <img :src="arr.desc.sender.avatar" />
                    </span>
                    <div class="text1-column">
                      <h5 class="text1-user">{{arr.desc.sender.username}}</h5>
                      <span class="text1-time">{{arr.time}}</span>
                    </div>
                  </div>
                  <div class="text1-main">
                    <p class="text1-msg"  @click="Goatlas(arr.desc.id)">{{arr.desc.desc}}</p>
                    <ul class="text1-list">
                      <li v-for="(bl,index) in arr.blogs?arr.blogs:''" :key="index" v-show="show" @click="GoDetail(bl.id)">
                        <img :src="bl.photo.path" @load="loadImage" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </van-tab> 
            <van-tab title="专辑">
              <div class="text-wrap">
                <div class="text2">
                  <ul class="card-wrap">
                    <li class="card" v-for="(card,index) in cardlist" :key="index" @click="Goalbum(card.id)">
                      <div class="cc" v-show="show">
                        <img :src="card.covers[0]" @load="loadImage" />
                        <div class="cc-msg">
                          <h5>{{card.name}}</h5>
                          <span>{{card.count}}张图片·{{card.favorite}}人收藏</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </van-tab>
            <van-tab title="收藏">
              <div class="text-wrap">
                <div class="text3" v-for="(msg,index) in msglist" :key="index">
                  <div class="msg">
                    <div class="msg-title">{{msg.title?msg.title:'此内容已被删除'}}</div>
                    <ul class="msg-grid" >
                      <li v-for="(img,index) in msg.photos" :key="index" >
                        <img
                          :src="img.path"
                        />
                      </li>
                    </ul>
                  </div>
                  <div class="ss">
                    <span>{{msg.type=="album"?"专辑":"文章"}}&nbsp;|&nbsp;{{msg.username.username}}</span>
                    <span>{{msg.time}}</span>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { get } from "utils/http";
// import BScroll from "better-scroll";
import { Tab, Tabs, Sticky } from "vant";

Vue.use(Sticky);
Vue.use(Tab).use(Tabs);
export default {
  data() {
    return {
      show: false,
      active: 1,
      arr: "",
      personlist: [],
      listArr: [],
      cardlist: [],
      msglist:[],
      next_start:0
    };
  },
  async mounted() {
    let id = this.$route.query.id;
    let result = await get({
      url: `/napi/people/profile/`,
      params: {
        user_id: id
      }
    });
    this.arr = result.data;
  },
  methods: {
    GoDetail(id){
      this.$router.push(`/imgdetails/?id=${id}`);
    },
    Goalbum(id){
      this.$router.push(`/album/?id=${id}`);
    },
    Goatlas(id){
      this.$router.push(`/atlas/?id=${id}`);
    },
    loadImage() {
      let _this = this;
      _this.show = true;
    },
    async getData() {
      let id = this.$route.query.id;
      let personal = await get({
        url: `/napi/vienna/useractivity/personal/`,
        params: {
          start: this.next_start,
          limit: 24,
          more: 1,
          user_id: id
        }
      });
      this.personlist = personal.data.object_list;

      for (let i = 0; i < this.personlist.length; i++) {
        this.listArr.push({
          time: this.personlist[i].date_str,
          desc: this.personlist[i].data.atlas,
          blogs: this.personlist[i].data.atlas.blogs
        });
      }
    },
    async getCard() {
      let id = this.$route.query.id;
      let result = await get({
        url: `/napi/album/list/by_user/`,
        params: {
          start: 0,
          limit: 24,
          more: 1,
          user_id: id
        }
      });
      this.Cardlist = result.data.object_list;
      for (let i = 0; i < this.Cardlist.length; i++) {
        this.cardlist.push({
          id:this.Cardlist[i].id,
          name: this.Cardlist[i].name,
          count: this.Cardlist[i].count,
          favorite: this.Cardlist[i].favorite_count,
          covers: this.Cardlist[i].covers
        });
      }
    },
    async getMsg() {
      let id = this.$route.query.id;
      let result = await get({
        url: `/napi/favorite/list/`,
        params: {
          start: 0,
          limit: 24,
          more: 1,
          user_id: id
        }
      });
      // this.msglist = result.data.object_list;
      for(let i=0;i<result.data.object_list.length;i++){
      // console.log(result.data.object_list[i].status_str);
          this.msglist.push({
            title:result.data.object_list[i].title,
            username:result.data.object_list[i].sender,
            time:result.data.object_list[i].add_datetime,
            type:result.data.object_list[i].type,
            photos:result.data.object_list[i].photos,
            // status:result.data.object_list[i].status_str,
          })
      }
    }
  },
  created() {
    let date = new Date();
    this.next_start = parseInt(date.getTime() / 1000) * 1000;
    this.getData();
    this.getCard();
    this.getMsg()
  }
};
</script>

<style lang="stylus">
.page-transition {
  .van-tab--active {
    color: #ff7e7e;
  }

  .van-tab__pane {
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    // background: #fff;
    position: relative;
  }

  .van-tabs__line {
    width: 33.3333% !important;
    left: 0%;
    height: 0.02rem !important;
    position: absolute;
    background-color: #ff7e7e;
    opacity: 0.5;
    transform: translate3d(0, 0, 0);
  }

  .van-sticky--fixed {
    top: 0.44rem !important;
  }
}
</style>

<style lang='stylus' scoped>
.page-transition {
  width: 100%;
  min-height: 2rem;
  margin-top: 0.02rem;
  position: relative;

  .page-wrap {
    position: relative;
    color: white;

    .bg {
      width: 100%;
      padding-bottom: 100%;
      top: 0px;
      left: 0px;
      background-size: cover;
      position: relative;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .bg-bottom {
      position: absolute;
      width: 100%;
      padding-bottom: 100%;
      top: 0px;
      left: 0px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
    }

    .user-detail {
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      top: 0px;
      width: 100%;
      height: 100%;
      z-index: 9;
      display: flex;

      .bg2 {
        width: 0.8rem;
        height: 0.8rem;
        display: block;

        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
        }
      }

      h3 {
        font-size: 0.2rem;
        line-height: 0.25rem;
        font-weight: 400;
        margin-top: 0.16rem;
      }

      .fs {
        font-size: 0.13rem;
        line-height: 0.18rem;
        margin-top: 0.17rem;
      }

      .msg {
        width: 90%;
        opacity: 0.8;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        line-height: 0.21rem;
        text-align: center;
        margin-top: 0.2rem;
        overflow: hidden;
      }
    }
  }

  .tab-wrap {
    .tab-top {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      position: relative;
      overflow: hidden;
      height: 100%;
      width: 100%;
      flex-direction: column;

      .tab-top-wrap {
        .score {
          height: 0.3rem;
          box-sizing: border-box;
          font-size: 0.12rem;
          line-height: 0.3rem;
          color: rgb(170, 170, 170);
          background-color: rgb(245, 245, 245);
          padding: 0 0.2rem;
        }
      }
    }
  }

  .text-wrap {
    width: 100%;
    flex-shrink: 0;
    height: auto;

    .text1 {
      padding: 0.22rem 0.2rem;
      border-bottom: 1px solid rgb(240, 240, 240);
      background: #fff;

      .text1-top {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;

        .text1-bg {
          width: 0.3rem;
          height: 0.3rem;
          display: block;

          img {
            border-radius: 100%;
            width: 100%;
            height: 100%;
          }
        }

        .text1-column {
          margin-left: 0.06rem;
          align-items: flex-start;
          display: flex;
          flex-direction: column;

          h5 {
            font-size: 0.13rem;
            line-height: 0.18rem;
            color: rgb(119, 119, 119);
          }

          span {
            line-height: 0.12rem;
            font-size: 0.1rem;
            color: rgb(204, 204, 204);
          }
        }
      }

      .text1-main {
        padding-left: 0.35rem;
        width: 100%;

        .text1-msg {
          word-break: break-all;
          font-size: 0.16rem;
          color: rgb(68, 68, 68);
          margin-top: 0.06rem;
          width: 100%;
          overflow: hidden;
        }

        .text1-list {
          margin-top: 0.08rem;
          display: flex;
          // flex-direction column
          width: 100%;
          flex-wrap: wrap;
          box-sizing: border-box;

          li {
            margin-bottom: 0.04rem;
            margin-right: 0.04rem;
            width: 0.96rem;
            height: 0.96rem;
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
    }

    .text2 {
      margin-top: 0.08rem;
      margin-left: 0.1rem;
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;

      .card-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;

        .card {
          box-sizing: border-box;
          width: 1.62rem;
          height: 2.2rem;
          margin-bottom: 0.08rem;
          font-size: 0.12rem;
          padding-bottom: 0px;
          color: rgb(51, 51, 51);
          overflow: hidden;
          margin-right: 0.2rem;
          border-radius: 5px;

          .cc {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;

            img {
              height: 1.62rem;
              width: 1.62rem;
              display: block;
            }

            .cc-msg {
              padding: 0.12rem 0.08rem;
              border-bottom: 1px solid rgb(224, 224, 224);
              background: #fff;
              width: 100%;
              height: 100%;

              h5 {
                font-size: 0.12rem;
                color: rgb(51, 51, 51);
                margin: 0px;
                padding: 0px;
              }

              span {
                color: rgb(153, 153, 153);
                margin-top: 0.05rem;
              }
            }
          }
        }
      }
    }

    .text3 {
      align-items: center;
      display: flex;
      flex-direction: column;
      padding: 0.15rem 0.15rem 0.12rem;
      border-bottom: 1px solid rgb(240, 240, 240);
      background: #fff;

      .msg {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;

        .msg-title {
          width: 90%;
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.15rem;
          font-weight: 400;
          line-height: 0.2rem;
          color: rgb(68, 68, 68);
          overflow: hidden;
        }

        .msg-grid {
          margin-top: 0.08rem;
          background: #fff;
          align-items: stretch;
          justify-content: center;
          display: flex;

          li {
            width: 25%;
            padding: 0px 0px 4px 4px;
            position: relative;
            width: .8rem;
            height: .8rem;
            border-radius: 4px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .ss {
        width: 100%;
        margin-top: 0.09rem;
        font-size: 0.11rem;
        color: rgb(119, 119, 119);
        justify-content: space-between;
        align-items: center;
        display: flex;
        span {
          font-size: 0.11rem;
          color: rgb(119, 119, 119);
        }
      }
    }
  }
}
</style>
<template>
  <div class="album-wrap">
    <div class="user-wrap">
      <h5 class="hh">{{arr.name}}</h5>
      <span class="ss">{{arr.count}}张图片</span>
      <span class="ii" @click="Gouser(arr.user.id)">
        <img :src="arr.user?arr.user.avatar:''" />
      </span>
      <span class="user" @click="Gouser(arr.user.id)">{{arr.user?arr.user.username:''}}</span>
    </div>
    <div class="img-wrap">
      <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData" @click="clickFn">
        <div class="column">
          <h5 class="tx">{{mm}}</h5>
          <i></i>
        </div>
      </vue-waterfall-easy>
    </div>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
import { get } from "utils/http";
export default {
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      next_start: 0,
      group: 0,
      wfList: [],
      imgsArr: [],
      arr: "",
      mm: ""
    };
  },
  methods: {
    clickFn(event, imgid) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        this.$router.push(`/imgdetails/?id=${imgid.value.imgid}`);
      }
    },
    Gouser(id){
      this.$router.push(`/user/?id=${id}`);
    },
    async getData() {
      let id = this.$route.query.id;
      let resWF = await get({
        url: `/napi/blog/list/by_album/`,
        params: {
          start: this.group,
          limit: 24,
          more: 1,
          album_id: id
        }
      });
      this.wfList = this.wfList.concat(resWF.data.object_list);
      // console.log(this.wfList);

      for (var i = 0; i < this.wfList.length; i++) {
        this.imgsArr.push({
          src: this.wfList[i].photo.path,
          href: "",
          imgid: this.wfList[i].id
        });
        this.mm = this.wfList[i].msg;
      }

      this.next_start = resWF.data.next_start;
      this.group = this.next_start;
    },
    async getUser() {
      let id = this.$route.query.id;
      let result = await get({
        url: "/napi/album/detail/",
        params: {
          album_id: id
        }
      });
      this.arr = result.data;
    }
  },
  created() {
    this.getData();
    this.getUser();
  }
};
</script>

<style lang='stylus' scoped>
.album-wrap {
  .user-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 0.05rem;
    background-color: white;
    margin-top: 0.04rem;
    padding: 0.2rem;

    .hh {
      font-size: 0.2rem;
      line-height: 0.28rem;
    }

    .ss {
      font-size: 0.12rem;
      line-height: 0.17rem;
      color: rgb(153, 153, 153);
      margin-top: 0.04rem;
    }

    .ii {
      margin-top: 0.1rem;
      width: 0.4rem;
      height: 0.4rem;

      img {
        border-radius: 100%;
        width: 100%;
        height: 100%;
      }
    }

    .user {
      font-size: 0.12rem;
      line-height: 0.14rem;
      color: rgb(68, 68, 68);
      margin-top: 0.04rem;
    }
  }

  .img-wrap {
    overflow: visible;
    width: auto;
    margin-top: 8px;
    padding: 0 10px;
    background: #fff;

    .column {
      padding: 8px 8px 5px;
      border-bottom: 1px solid rgb(224, 224, 224);

      .tx {
        color: rgb(68, 68, 68);
        word-break: break-all;
        font-size: 11px;
        font-weight: normal;
      }

      i {
        color: rgb(153, 153, 153);
        margin-top: 5px;

        &::before {
          content: '★ ';
        }
      }
    }
  }
}
</style>

<style lang="stylus">
.img-box >a {
  width: 1.7rem;
  background: #fff;

  .img-wraper {
    width: 1.7rem !important;
    height: 100%;
  }
}
</style>
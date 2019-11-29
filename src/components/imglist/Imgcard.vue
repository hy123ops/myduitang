<template>
  <div class="am-card">
    <a href="javascript:;" :id="imgid">
      <div direction="column" class="nm-wrap">
        <h5 class="nm1" :id="info.id" @click="Go(info.id)">{{info.name}}</h5>
        <div class="sc">{{info.like_count}}</div>
      </div>
    </a>
    <div class="am-flexboxr" :id="info.id" >
      <span class="tx" :style="{backgroundImage:'url('+username.avatar+')'}" @click="handClick(username.id)">
        <!-- <img :src="username.avatar" /> -->
      </span>
      <div class="am-column">
        <a href="javascript:;" class="nm" :id="username.id" @click="handClick(username.id)">{{username.username}}</a>
        <a href="javascript:;" class="zj" :id="info.id" @click="Go(info.id)">{{info.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "utils/http";

export default {
  props:["info","username","imgid"],
  methods: {
    handClick(id){
      this.$router.push(`/user/?id=${id}`);
    },
    Go(id){
      this.$router.push(`/album/?id=${id}`);
    }
  },
};
</script>

<style lang='stylus' scoped>
.am-card {
  width: 100%;
  min-height: .6rem;
  background:#fff;
  a {
    display: block;
    img {
      min-height: 1rem;
      width: 1.47rem;
      display: block;
    }

    .nm-wrap {
      padding: 0.08rem 0.08rem 0.05rem;
      border-bottom: 1px solid rgb(224, 224, 224);

      h5 {
        font-size: 0.12rem;
        color: rgb(51, 51, 51);
      }

      .sc {
        color: rgb(153, 153, 153);
        font-size: 0.12rem;

        &::before {
          content: '★ ';
        }
      }
    }
  }

  .am-flexboxr {
    text-align: left;
    overflow: hidden;
    display: flex;
    // line-height: 0.2rem;
    padding: 0.08rem;

    .tx {
      background-size: 100%;
      width: 0.3rem;
        height: 0.3rem;
        border-radius: 100%;
      // img {
      //   width: 0.3rem;
      //   height: 0.3rem;
      //   border-radius: 100%;
      // }
    }

    .am-column {
      text-align: left;
      overflow: hidden;
      display: flex;
      margin-left: 0.08rem;
      flex-direction: column;
      font-size: 0.12rem;

      .nm {
        color: rgb(52, 152, 219);
      }

      .zj {
        color: rgb(51, 51, 51);
      }
    }
  }
}
</style>
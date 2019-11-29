<template>
  <div class="index-wrap">
    <header>
      <router-link tag="div" to="/index/home" class="sy" @click.native="handleHome">首页</router-link>
      <van-tabs :title-active-color="color" v-model="avtive" @click="handleChange">
        <van-tab
          v-for="(item,index) in navlist"
          :title="item.name"
          :key="index"
          :to="`/index/bz/${item.catekey}?title=${item.name}`"
        ></van-tab>
      </van-tabs>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";

Vue.use(Tab).use(Tabs);

export default {
  data() {
    return {
      avtive: 0,
      color: "#7d7e80",
      lastTitle: "",
      navlist: [
        {
          name: "壁纸",
          catekey: "5d5cf9260c14a94a3155e254"
        },
        {
          name: "头像",
          catekey: "5d4cde1a405dd99416c2afbd"
        },
        {
          name: "表情",
          catekey: "5d4bf0ed405dd99416c2af6f"
        },
        {
          name: "文字",
          catekey: "5d4cdeba405dd99416c2afbe"
        },
        {
          name: "爱豆",
          catekey: "5d4cdbf0405dd99416c2afb7"
        },
        {
          name: "影视",
          catekey: "5d4cdcdc405dd99416c2afb9"
        },
        {
          name: "动漫",
          catekey: "5d4cdd82405dd99416c2afbb"
        }
      ]
    };
  },

  methods: {
    handleChange(name, title) {
      this.color = "#323233";
      document.querySelector(".van-tabs__line").style.display = "block";
      if (this.lastTitle !== title) {
        this.lastTitle = title;
      }
    },
    handleHome() {
      if (this.lastTitle !== "") {
        this.color = "#7d7e80";
        this.lastTitle = "";
        document.querySelector(".van-tabs__line").style.display = "none";
      }
    },
    gotoHome() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="stylus">
header {
  .van-tab__pane {
    display: none;
  }
.van-tabs__line {
  display: none;
  width: 0.5rem !important;
  position: absolute;
  height: 0.04rem;
  background-color: #ff7e7e;
}
}

</style>

<style lang='stylus' scoped>
.index-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;

  header {
    width: 100%;
    height: 0.44rem;
    margin-bottom: 0.02rem;
    padding-left: 0.12rem;
    padding-right: 0.12rem;
    background-color: white;
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 99;

    .sy {
      width: 20%;
      line-height: 0.44rem;
      text-align: center;
      font-size: 0.16rem;
      color: rgb(119, 119, 119);
      font-weight: bold;
      position: relative;

      &::before {
        content: '';
        width: 0.01rem;
        height: 0.26rem;
        line-height: 0.26rem;
        text-align: center;
        position: absolute;
        right: 0px;
        top: 0.1rem;
        background: rgb(224, 224, 224);
      }
    }

    .van-tabs {
      display: flex;
      flex-direction: row;
      flex: 1;
      position: relative;
      overflow: hidden;

      .van-tab {
        width: 25%;
        color: rgb(0, 0, 0);
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.16rem;
        padding-left: 0.15rem;
        border-bottom: 0.01rem solid transparent;
      }
    }
  }

  main {
    flex: 1;
    margin-top: 0.03rem;
    overflow: scroll;
  }
}
</style>
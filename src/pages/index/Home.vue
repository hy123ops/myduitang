<template>
  <div class="wrapper">
    <div class="wrapper-wrap" ref="wrap">
      <van-swipe :autoplay="3000" indicator-color="#1989fa">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>

      <div class="img_navigation">
        <ul>
          <router-link class="img_navli" tag="li" to="/index/bz/5d5cf9260c14a94a3155e254?title=壁纸">
            <img src="/imgs/11.png" alt />
            <span class="imgWord">壁纸</span>
            <span class="zz"></span>
          </router-link>
          <router-link class="img_navli" tag="li" to="/index/bz/5d4cde1a405dd99416c2afbd?title=头像">
            <img src="/imgs/12.png" alt />
            <span class="imgWord">头像</span>
            <span class="zz"></span>
          </router-link>
          <router-link class="img_navli" tag="li" to="/index/bz/5d4bf0ed405dd99416c2af6f?title=表情">
            <img src="/imgs/13.png" alt />
            <span class="imgWord">表情</span>
            <span class="zz"></span>
          </router-link>
          <router-link class="img_navli" tag="li" to="/index/bz/5d4cdeba405dd99416c2afbe?title=文字">
            <img src="/imgs/14.png" alt />
            <span class="imgWord">文字</span>
            <span class="zz"></span>
          </router-link>
        </ul>
        <ul>
          <router-link class="img_navli" tag="li" to="/index/bz/5d4cdbf0405dd99416c2afb7?title=爱豆">
            <img src="/imgs/15.png" alt />
            <span class="imgWord">爱豆</span>
            <span class="zz"></span>
          </router-link>
          <router-link class="img_navli" tag="li" to="/index/bz/5d4cdcdc405dd99416c2afb9?title=影视">
            <img src="/imgs/16.png" alt />
            <span class="imgWord">影视</span>
            <span class="zz"></span>
          </router-link>
          <router-link class="img_navli" tag="li" to="/index/bz/5d4cdd82405dd99416c2afbb?title=动漫">
            <img src="/imgs/17.png" alt />
            <span class="imgWord">动漫</span>
            <span class="zz"></span>
          </router-link>
          <router-link class="img_navli" tag="li" to="/category">
            <img src="/imgs/18.png" alt />
            <span class="imgWord2"></span>
            <span class="imgWord1">更多分类</span>
            <span class="zz"></span>
          </router-link>
        </ul>
      </div>
    </div>

    <img-list  :imgsData="imgsArr"></img-list>
  </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import { Swipe, SwipeItem, Lazyload, Grid, GridItem, Image } from "vant";
import ImgList from "components/imglist/Imglist";

Vue.use(Swipe).use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid).use(GridItem);
Vue.use(Image);
export default {
  name: "home",
  data() {
    return {
      images: [
        "/imgs/1.jpeg",
        "/imgs/2.jpeg",
        "/imgs/3.jpeg",
        "/imgs/4.jpeg",
        "/imgs/5.jpeg"
      ],
      imgsArr:[]
    };
  },
  components: {
    ImgList
  },
  mounted() {
  },
};
</script>

<style lang="stylus">
.wrapper{

    height: 100%;
}
.bz {
  background: rgba(0, 0, 0, 0.5);
  width: 0.69rem;
  height: 0.69rem;
  position: absolute;
  text-align: center;
  line-height: 0.69rem;
  color: #fff;
}

.van-image__img {
  width: 0.69rem;
  height: 0.69rem;
}

.van-grid-item__content {
  padding: 0 0;
  padding-top: 0.08rem;
}
</style>

<style lang="stylus" scoped>
.van-swipe {
  img {
    width: 100%;
    height: 1.8rem;
  }
}

.img_navigation {
  background: #fff;
  padding: 0.1rem;

  ul {
    display: flex;

    .img_navli {
      flex: 1;
      margin: 0.05rem;
      position: relative;

      img {
        height: 100%;
        width: 100%;
      }

      .zz {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .imgWord {
        position: absolute;
        color: white;
        top: 38%;
        left: 35%;
        z-index: 999;
      }

      .imgWord1 {
        position: absolute;
        color: white;
        top: 50%;
        left: 16%;
        z-index: 999;
      }

      .imgWord2 {
        position: absolute;
        height: 0.2rem;
        width: 0.2rem;
        background: url('/imgs/more.png');
        background-size: 0.2rem;
        color: white;
        top: 26%;
        left: 38%;
        z-index: 999;
      }
    }
  }
}
</style> 


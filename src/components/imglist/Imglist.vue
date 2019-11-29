<template>
  <div class="list-wrap" ref="list">
    <vue-waterfall-easy
     class="waterfall"
      @preloaded="handle"
       :imgsArr="imgsArr"
        @click="clickFn">
      <template slot-scope="props">
        <img-card
          :info="props.value.info"
          :username="props.value.username"
          :imgid="props.value.imgid"
        ></img-card>
      </template>
    </vue-waterfall-easy>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
import ImgCard from "./Imgcard";
import { get } from "utils/http";

export default {
  props: ["imgsData"],
  components: {
    ImgCard,
    vueWaterfallEasy
  },
  data() {
    return {
      imgsArr: [], //存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: [], //存放每次滚动时下一批要加载的图片的数组
      group: 0,
      next_start: 0,
      isGetData: true
    };
  },
  methods: {
    add() {},
    clickFn(event, imgid) {
      // 阻止a标签跳转
      event.preventDefault();
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == "img") {
        this.$router.push(`/imgdetails/?id=${imgid.value.imgid}`);
      }
    },
    handle() {
      let that = this;
      setTimeout(() => {
        let imgs = document.getElementsByClassName("img-box");
        let length = imgs.length;
        let img1 = imgs[length - 1];
        let img2 = imgs[length - 2];
        let img =
          getComputedStyle(img1).top > getComputedStyle(img2).top ? img1 : img2;
        this.$refs.list.style.height =
          ~~getComputedStyle(img).top.replace("px", "") +
          ~~getComputedStyle(img).height.replace("px", "") +
          "px";
        (that.isGetData = true),
          (document.querySelector(
            ".vue-waterfall-easy-container > .loading[data-v-ded6b974]"
          ).style.display = "none");
      }, 0);
    },
    initImgsArr(data) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        arr.push({
          src: data[i].photo.path,
          // href: "/imgdetail/" + data[i].id,
          info: data[i].album,
          username: data[i].sender,
          imgid: data[i].id
        });
      }
      return arr;
    },
    getData(cb) {
      get({
        url: "/napi/index/hot/",
        params: {
          start: this.group,
          limit: 24,
          more: 1,
          include_fields: "sender%2Calbum"
        }
      }).then(res => {
        this.imgsArr.push(...this.initImgsArr(res.data.object_list));
        this.next_start = res.data.next_start;
        this.group = this.next_start;
        if (cb) cb();
      });
    }
  },
  async created() {
    this.getData();
  },
  mounted() {
    let that = this;
    document.querySelector("main").addEventListener("scroll", function() {
    //   console.log(11);
    //   console.log(this.scrollHeight, this.offsetHeight, this.scrollTop);

      if (
        this.scrollHeight <= this.offsetHeight + this.scrollTop + 2 &&
        that.isGetData
      ) {
        that.isGetData = false;

        document.querySelector(".ball-beat").style.display = "block";
        // console.log(document.querySelector(".ball-beat").style.display);
        that.getData();
      }
    });
  }
};
</script>

<style lang='stylus' scoped>
.list-wrap {
  width: 100%;
  margin-top: 0.06rem;
  position: relative;
}
</style>

<style lang="stylus">
.vue-waterfall-easy-scroll {
}
.ball-beat{
  display block
}
.vue-waterfall-easy-container > .loading.ball-beat > .dot[data-v-ded6b974] {
  background-color: #ff7e7e !important;
}
</style>
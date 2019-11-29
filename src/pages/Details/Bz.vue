<template>
<div ref="list" class="list">
  <vue-waterfall-easy
    :isRouterLink="true"
    linkRange="img"
    :imgsArr="imgsArr"
    @scrollReachBottom="getData"
    @click="clickFn"
  >
    <img-card
      slot-scope="props"
      :info="props.value.info"
      :username="props.value.username"
      :imgid="props.value.imgid"
    ></img-card>
  </vue-waterfall-easy>
  </div>
</template>

<script>
import { get } from "utils/http";
import ImgCard from "components/imglist/Imgcard";
import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  components: {
    ImgCard,
    vueWaterfallEasy
  },
  data() {
    return {
      next_start: 0,
      group: 0,
      imgsArr: [],
      list:[],
      isGetData: true
    };
  },
  beforeRouteUpdate(to,from,next){
    this.imgsArr=[]
    this.getData();
    next()
  },
  methods: {
    add() {},
    clickFn(event, imgid) {
      // 阻止a标签跳转
      event.preventDefault();
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
          href: "/imgdetails/?id=" + data[i].id,
          info: data[i].album,
          username: data[i].sender,
          imgid: data[i].id
        });
      }
      return arr;
    },
    getData(cb) {    
      let id = this.$route.params.id;
      get({
        url: "/napi/blog/list/by_category/",
        params: {
          start: this.group,
          limit: 24,
          more: 1,
          include_fields: "sender,album,like_count,msg",
          cate_key: id
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
    // document.querySelector("main").addEventListener("scroll", function() {
    //   if (
    //     this.scrollHeight <= this.offsetHeight + this.scrollTop + 2 &&
    //     that.isGetData
    //   ) {
    //     that.isGetData = false;

    //     document.querySelector(".ball-beat").style.display = "block";
    //     // console.log(document.querySelector(".ball-beat").style.display);
    //     that.getData();
    //   }
    // });
  }
};
</script>

<style lang="stylus" scoped>
.list{
  height 100%
}
</style>
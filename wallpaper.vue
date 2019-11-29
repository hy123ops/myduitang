<template>
  <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData" :mobileGap=8 >
    <div class="img-info" slot-scope="props" >
      <div class="name">
        <span class="photoname">{{props.value.photoName}}</span>
        <span class="commend">{{'★ '+props.value.commend}}</span>
      </div>
      <div class="usermessage">
        <img class="ChatHead" :src="props.value.ChatHead" alt />
        <span class="username">{{props.value.username}}</span>
        <br />
        <span class="photoname photoname1">{{props.value.photoName}}</span>
      </div>
    </div>
  </vue-waterfall-easy>
</template>

<script>
import Vue from 'vue';
import { get } from 'utils/http'
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios'
export default {
  data() {
    return {
      next_start: 0,
      group: 0,
      wfList: [],
      imgsArr: [],
      cate_key:"5d5cf9260c14a94a3155e254"
      // fetchImgsArr: []
    };
    // console.log(wfList);

  },

  components: {
    vueWaterfallEasy
  },
  methods: {
    async getData() {
      let resWF = await get({
        url: "/napi/blog/list/by_category/?include_fields=sender%2Calbum%2Clike_count%2Cmsg",
        params: {
          start: this.group,
          limit: 24,
          more: 1,
  
          cate_key:this.cate_key

        }
      });
      this.wfList = this.wfList.concat(resWF.data.object_list);
      console.log(this.wfList);
      
      for (var i = this.imgsArr.length; i < this.wfList.length; i++) {
        this.imgsArr.push({
          src: this.wfList[i].photo.path, href: "",
          id: this.wfList[i].album.id,
          commend: this.wfList[i].album.favorite_count,
          photoName: this.wfList[i].album.name,
          username: this.wfList[i].sender.username,
          ChatHead: this.wfList[i].sender.avatar

        });
      }
      console.log(this.imgsArr);
      console.log(resWF.data.next_start);

      this.next_start = resWF.data.next_start;
      this.group = this.next_start;
    },

  },
  created() {
    this.getData()
  },
}

</script>

<style lang="stylus">
.img-info
  .name
    height 0.5rem
    padding 0.08rem 0.08rem 0.05rem
    border-bottom 0.01rem solid rgb(224, 224, 224)
    .photoname
      font-size 12px
      color rgb(51, 51, 51)
      margin 0px
      padding 0px
      font-weight bold
      display block
    .commend
      color rgb(153, 153, 153)
      margin-top 5px
  .usermessage
    position relative
    height 0.8rem
    .ChatHead
      padding 0.1rem 0.05rem
      width 0.5rem
      height 0.55rem
      border-radius 100%
    .username
      padding 0.1rem
      font-size 0.12rem
      color rgb(52, 152, 219);
    .photoname1
      position absolute
      font-size 0.12rem
      left 30%
      top 48%
      color rgb(51, 51, 51)
</style>
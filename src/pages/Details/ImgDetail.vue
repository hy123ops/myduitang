<template>
  <div class="dewrap">
    <div class="child-wrap">
      <div class="detail-wrap">
        <div class="wrapp">
          <div class="imgBig" v-show="show">
            <img :src="arr.photo?arr.photo.path:''" @load="loadImage" ref="img" />
          </div>
          <div class="imgDetail">
            <p class="img-p">{{arr.msg}}</p>
            <div class="img-tx">
              <div class="tx-wrap">
                <a href="javascript:;" @click="GoDetail(arr.sender.id)">
                  <img :src="arr.sender?arr.sender.avatar:''" />
                </a>
                <div class="user">
                  <a class="userName" href="javascript:;" @click="GoDetail(arr.sender.id)">
                    <h5>{{arr.sender?arr.sender.username:''}}</h5>
                  </a>
                  <a class="collectTo" href="javascript:;">
                    <span>收藏到 {{arr.album?arr.album.name:''}}</span>
                  </a>
                </div>
              </div>
              <div class="time">{{time}}</div>
            </div>
            <div class="img-about" v-if="arr.tags?arr.tags.length>0:''">
              <h4>相关标签</h4>
              <div class="about-wrap">
                <a href="javascript:;" v-for="(value,index) in arr.tags" :key="index">
                  <div class="tag">
                    <div class="am-tag-text">{{value.name}}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="detail-bottom">
        <div class="zj-wrap">
          <a href="javascript:;">
            <div class="am-wingblank">
              <div class="center">
                <p>收藏到以下专辑</p>
                <span>
                  {{arr.favorite_count}}
                  <i></i>
                </span>
              </div>
            </div>
          </a>
        </div>
        <ul class="zjimg-wrap">
          <li>
            <a
              href="javascript:;"
              v-for="(value,index) in arr.related_albums"
              :key="index"
              :id="value.id"
              @click="gotoAlbum(value.id)"
            >
              <div class="album-cover">
                <img :src="value?value.covers[0]:''" />
                <span class="sf" v-if="value.is_root">首发</span>
              </div>
              <div class="album-info">
                <p class="like">{{value.name}}</p>
                <span class="user">by {{value.user.username}}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Overlay } from 'vant';

import { get } from "utils/http";
import BScroll from "better-scroll";
Vue.use(Overlay);

export default {
  data() {
    return {
      arr: "",
      show: false,
      time: ""
    };
  },
  methods: {
    loadImage() {
      let _this = this;
      _this.show = true;
      this.$refs.img.style.paddingBottom = 0;
    },
    gotoAlbum(id) {
      this.$router.push(`/album/?id=${id}`);
    },
    GoDetail(id){
      this.$router.push(`/user/?id=${id}`);
    }
  },
  async mounted() {
    let id = this.$route.query.id;
    let bScroll = new BScroll(".dewrap", {
      bounce: false,
      click: true
    });
    let result = await get({
      url: `/napi/blog/detail/?blog_id=${id}&include_fields=tags%2Crelated_albums%2Crelated_albums.covers%2Croot_album%2Cshare_links_2%2Cextra_links%2Cicon_description%2Croot_id`
    });
    this.arr = result.data;
    // console.log(this.arr.add_datetime_ts);
    let now = new Date(this.arr.add_datetime_ts * 1000);
    let Y = now.getFullYear() + "年";
    let M = now.getMonth() + 1 + "月";
    let D = now.getDay() +1+ "日";
    this.time = Y + M + D;
    // console.log(this.time);
  }
};
</script>

<style lang='stylus' scoped>
.dewrap {
  height: 100%;

  .child-wrap {
    width: 100%;

    .detail-wrap {
      background: #fff;
      padding: 0.1rem 0.08rem;
      margin-bottom: 0.15rem;

      .wrapp {
        .imgBig {
          width: 100%;
          min-height: 1rem;

          img {
            width: 100%;
            padding-bottom: 85%;
          }
        }
      }

      .imgDetail {
        .img-p {
          font-size: 0.15rem;
          color: rgb(68, 68, 68);
          margin: 0px;
          padding: 0.1rem 0;
        }

        .img-tx {
          padding-bottom: 0.13rem;
          text-align: left;
          overflow: hidden;
          display: flex;
          align-items: center;

          .tx-wrap {
            display: flex;
            min-width: 0px;
            flex: 1 1 0%;

            >a {
              display: inline-block;
              margin-right: 0.1rem;

              img {
                width: 0.36rem;
                height: 0.36rem;
                border-radius: 50%;
              }
            }

            .user {
              min-width: 0px;
              flex: 1 1 0%;

              .userName {
                display: inline-block;
                width: 100%;

                h5 {
                  margin-top: 0px;
                  margin-bottom: 0.03rem;
                  line-height: 0.18rem;
                  font-size: 0.13rem;
                  color: rgb(68, 68, 68);
                }
              }

              .collectTo {
                display: inline-block;
                width: 100%;

                span {
                  font-size: 0.12rem;
                  color: rgb(119, 119, 119);
                  display: inline-block;
                  width: 100%;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }
              }
            }
          }

          .time {
            height: 0.37rem;
            line-height: 0.18rem;
            font-size: 0.11rem;
            color: rgb(170, 170, 170);
          }
        }

        .img-about {
          margin: 0 0.16rem;
          padding: 0.16rem 0 0.08rem;
          border-top: 1px solid rgb(199, 199, 199);
          border-bottom: none;

          h4 {
            font-size: 14px;
            font-weight: 400;
            font-family: PingFangSC-Regular;
            color: rgb(170, 170, 170);
            margin: 0px;
          }

          .about-wrap {
            display: flex;
            -webkit-box-pack: start;
            justify-content: flex-start;
            -webkit-box-align: center;
            align-items: center;
            flex-flow: row wrap;

            a {
              display: block;

              .tag {
                position: relative;
                border: none;
                color: #888;
                border-radius: 3px;
                background-color: rgb(245, 245, 245);
                margin: 0.1rem 0.1rem 0px 0px;

                &::before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 200%;
                  height: 200%;
                  border: 1PX solid #ddd;
                  border-radius: 6px;
                  transform-origin: 0 0;
                  transform: scale(0.5);
                  box-sizing: border-box;
                  pointer-events: none;
                }

                .am-tag-text {
                  font-size: 0.12rem;
                  text-align: center;
                  padding: 0 0.15rem;
                  height: 0.25rem;
                  line-height: 0.25rem;
                }
              }
            }
          }
        }
      }
    }

    .detail-bottom {
      background: rgb(255, 255, 255);

      .zj-wrap {
        a {
          .am-wingblank {
            font-size: 0.16rem;
            color: rgb(119, 119, 119);
            // padding: 0.1rem 0;
            margin-left: 0.08rem;
            margin-right: 0.08rem;

            .center {
              text-align: left;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: space-between;

              p {
                display: block;
                margin-block-start: 1em;
                margin-block-end: 1em;
                margin-inline-start: 0px;
                margin-inline-end: 0px;
              }

              span {
                line-height: 0.17rem;

                i {
                  display: inline-block;
                  margin-left: 10px;
                  width: 15px;
                  height: 17px;
                  vertical-align: bottom;
                  background-image: url('https://c-ssl.duitang.com/uploads/item/201808/13/20180813160453_nWc8Q.png'); // c-ssl.duitang.com/uploads/item/201808/13/20180813160453_nWc8Q.png);
                  background-size: contain;
                  background-repeat: no-repeat;
                }
              }
            }
          }
        }
      }

      .zjimg-wrap {
        margin: 0px;
        padding: 0px;
        list-style: none;

        li {
          vertical-align: middle;

          a {
            display: flex;
            padding: 0.1rem;
            border-top: 1px solid rgba(0, 0, 0, 0.08);

            .album-cover {
              position: relative;
              margin-right: 0.1rem;

              img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 4px;
              }

              .sf {
                position: absolute;
                top: 0px;
                left: 0px;
                background-color: rgb(242, 85, 85);
                color: rgb(255, 255, 255);
                font-size: 10px;
                text-align: center;
                line-height: 15px;
                padding: 1px 2px;
                border-radius: 4px 0px;
              }
            }

            .album-info {
              display: flex;
              -webkit-box-pack: justify;
              justify-content: space-between;
              padding: 2px 0px;
              flex-flow: column nowrap;

              .like {
                line-height: 0.22rem;
                font-size: 0.16rem;
                color: rgb(68, 68, 68);
                margin: 0px;
              }

              span {
                line-height: 0.17rem;
                font-size: 0.12rem;
                color: rgb(119, 119, 119);
              }
            }
          }
        }
      }
    }
  }
}
</style>
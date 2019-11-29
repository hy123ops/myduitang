import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from 'pages/index/Layout'
import Home from 'pages/index/Home'
import ImgDetails from 'pages/Details/ImgDetail'
import Atlas from 'pages/Details/Atlas'
import Bz from 'pages/Details/Bz'
import Category from 'pages/index/Category'
import Album from "pages/index/Album";
import User from "pages/index/User";
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/index/home'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    redirect: '/index/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
      },
      {
        path: '/imgdetails',
        name: 'imgdetails',
        component: ImgDetails,
      },
      {
        path: 'bz/:id',
        name: 'bz',
        component: Bz,
      },
      {
        path: '/category',
        name: 'category',
        component: Category
      },
      {
        name: "album",
        path: '/album',
        component: Album
      },
      {
        name: "user",
        path: '/user',
        component: User
      },
      {
        name: "atlas",
        path: '/atlas',
        component: Atlas
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

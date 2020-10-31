import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/index')
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/article',
    name: '商城',
    meta: {title: '商城', icon: 'tree'},
    children: [
      {
        path: 'article',
        name: '商品浏览',
        component: _import('item/view_item'),
        meta: {title: '商品浏览', icon: 'example'},
        menu: 'article'
      },
      {
        path: 'orderTime',
        name: '商店浏览',
        component: _import('store/view_store'),
        meta: {title: '商店浏览', icon: 'example'},
        menu: 'orderTime'
      },
      {
        path: 'orderTime',
        name: '订单信息',
        component: _import('order/dc_order'),
        meta: {title: '订单信息', icon: 'form'},
        menu: 'orderTime'
      },
      
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: {title: '用户管理', icon: 'table'},
    children: [
      {
        path: '',
        name: '个人设置', 
        component: _import('dc_user/dc_user'),
        meta: {title: '个人设置', icon: 'user'},
        menu: 'user'
      },
      {
        path: 'role',
        name: '商店管理',
        component: _import('store/store'),
        meta: {title: '商店管理', icon: 'user'},
        menu: 'role'
      },
      {
        path: 'article',
        name: '商品管理',
        component: _import('item/item'),
        meta: {title: '商品管理', icon: 'form'},
        menu: 'article'
      },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

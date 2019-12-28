import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Article from './components/Article.vue'

// Vue Routerを有効化
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // ルーティングテーブルを定義
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // 非同期ロード
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/article/:aid',
      name: 'article',
      component: Article,
      // props: true
      // パラメータの型変換
      props: routes => ({
        aid: Number(routes.params.aid)
      })
    }
  ]
})
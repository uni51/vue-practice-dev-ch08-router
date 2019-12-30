import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Article from './components/Article.vue'

// Vue Routerを有効化
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // コンポーネントの非同期ロード
      component: () => import('./views/About.vue')
    },
    {
      path: '/article/:aid',
      name: 'article',
      component: Article,
      props: true
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 戻るボタンでの移動は以前の位置を保持
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        // ハッシュ（#）がある場合は、指定の要素位置へ
        return { selector: to.hash }
      } else {
        // さもなくば先頭位置に移動
        return { x: 0, y: 0 }
      }
    }
  }  
})
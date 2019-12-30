import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Signin from './components/Signin.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // ログインページへのルート
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    // 認証を要求するルート
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        isRequestAuth: true
      }
    }
  ]
})

// authedフラグが立っていれば、認証済と見なす
let isAuthed = function() { return !!sessionStorage['authed']; }

router.beforeEach((to, from, next) => {
  // 認証を要求しており、認証済みでない場合にログインページに移動
  if (to.matched.some(route => route.meta.isRequestAuth) && !isAuthed()) {
        next({ path: '/signin', query: { path: to.fullPath }})
  } else {
    // 認証済み、または認証を要求しないページはそのまま表示
    next()
  }
});

export default router
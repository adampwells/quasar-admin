import {route} from 'quasar/wrappers'
import {createMemoryHistory, createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import routes from './routes'
import auth from '../auth'
import UserInfoStore from '../auth/user-info-store'
import UserInfoApi from '../auth/user-info-api'


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createHistory = process.env.MODE === 'ssr'
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
})

const publicRoutes = ['/login', '/login/oauth2/code/cognito', '/logout'] // Any paths that do not require authentication should go here
router.beforeEach((to, from, next) => {
  if (publicRoutes.indexOf(to.path) >= 0) {
    next()
    return
  }
  requireAuth(to, from, next)
})

export default router

function requireAuth(to, from, next) {
  if (!auth.isUserSignedIn()) {
    UserInfoStore.setLoggedIn(false)
    auth.auth.getSession()
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    UserInfoApi.getUserInfo().then(response => {
      UserInfoStore.setLoggedIn(true)
      UserInfoStore.setCognitoInfo(response)
      next()
    })
  }
}

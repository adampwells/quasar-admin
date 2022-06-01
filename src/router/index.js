import {route} from 'quasar/wrappers'
import {createMemoryHistory, createRouter, createWebHashHistory, createWebHistory, app} from 'vue-router'
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
  scrollBehavior: () => ({left: 0, top: 0}),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
})

router.beforeEach((to, from, next) => {
  console.log(`beforeEach() ${to.path}`)
  if (to.path.startsWith("/secure") && !to.path.includes('/secure/register') && !to.path.includes('/secure/purgatory')) {
    console.log(`gonna need auth for ${to.path}`)
    requireAuth(to, from, next)
  } else if ((to.path.includes('/secure/register') || to.path.includes('/secure/purgatory')) && !auth.isUserSignedIn()) {
    // in this case they are coming direct to the path, and need to go through login
    console.log(`gonna need auth for ${to.path}`)
    requireAuth(to, from, next)
  } else {
    console.log(`no auth for ${to.path}`)
    next()
  }
})

export default router

function requireAuth(to, from, next) {

  console.log(`requireAuth() ${to.path}`)

  if (!auth.isUserSignedIn()) {
    UserInfoStore.setLoggedIn(false)
    auth.auth.getSession()
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else {
    UserInfoStore.setLoggedIn(true)

    var person_status = undefined
    if (auth.getMarksterData().person_status != null) {
      console.log('looks like we have user data')
      person_status = auth.getMarksterData().person_status
      console.log(JSON.stringify(auth.getMarksterData()))
    } else {
      console.log('looks like we DON\'T have user data, so go get some')
      auth.getMarksterInfo().then((resp) => {
        auth.setMarksterInfo(resp.data)
        console.log(JSON.stringify(auth.getMarksterData()))
        person_status = resp.data.person_status
        if (person_status === 'not_registered') {
          console.log('go to /secure/register')
          next({
            path: '/secure/register',
          })
        } else if (person_status === 'no_autoenrol') {
          console.log('go to /secure/purgatory')
          next({
            path: '/secure/purgatory',
          })
        } else if (person_status === 'known') {
          console.log('go to next()')
          next()
        } else {
          next({
            path: '/404',
          })
        }
      }).catch((err) => {
        console.log(JSON.stringify(err))
      })
    }
    console.log('person_status ' + person_status)
    if (person_status === 'not_registered') {
      console.log('go to /secure/register')
      next({
        path: '/secure/register',
      })
    } else if (person_status === 'no_autoenrol') {
      console.log('go to /secure/purgatory')
      next({
        path: '/secure/purgatory',
      })
    } else if (person_status === 'known') {
      console.log('go to next()')
      next()
    } else {
      next({
        path: '/404',
      })
    }

  }
}

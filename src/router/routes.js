import auth from '../auth'

const routes = [
  {
    path: '/login',
    beforeEnter() {
      auth.auth.getSession()
    }
  },
  {
    path: "/login/oauth2/code/cognito",
    beforeEnter(to, from, next) {
      var currUrl = window.location.href
      auth.auth.parseCognitoWebResponse(currUrl)
    },
  },
  // {
  //   path: '/logout',
  //   beforeEnter(to, from, next) {
  //     auth.logout()
  //     next()
  //   },
  //   component: () => import('pages/Logout.vue')
  // },
  {
    path: '/secure',
    component: () => import('layouts/SecureLayout.vue'),
    children: [
      {path: 'dashboard', component: () => import('pages/Dashboard.vue')},
      {path: 'portfolio', component: () => import('pages/Portfolio.vue')},
      {path: 'watch', component: () => import('pages/Watch.vue')},
      {path: 'profile/user', component: () => import('pages/UserProfile.vue')},
      {path: 'profile/company', component: () => import('pages/CompanyProfile.vue')},
      {path: 'profile/ipaustralia', component: () => import('pages/IpAustralia.vue')},
      {path: 'documents/assign', component: () => import('pages/LTAssign.vue')},
      {path: 'documents/license', component: () => import('pages/LTLicense.vue')},
      {path: 'documents/confidentiality', component: () => import('pages/LTConfidentiality.vue')},
      {path: 'documents/cease', component: () => import('pages/LTCease.vue')},
      {path: 'documents/defaults', component: () => import('pages/LTDefaults.vue')},
      {path: 'calendar', component: () => import('pages/Calendar.vue')},
    ]
  },
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {path: '', component: () => import('pages/About.vue')},
      {path: 'about', component: () => import('pages/About.vue')},
      {path: 'pricing', component: () => import('pages/Pricing.vue')},
      {path: 'signup', component: () => import('pages/Signup.vue')},
      {
        path: 'logout',
        beforeEnter(to, from, next) {
          auth.logout()
          next()
        },
        component: () => import('pages/Logout.vue')
      },
    ]
  },

]

export default routes

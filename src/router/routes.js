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
      {path: 'profile/user', component: () => import('pages/settings/UserProfile.vue')},
      {path: 'profile/company', component: () => import('pages/settings/CompanyProfile.vue')},
      {path: 'profile/ipaustralia', component: () => import('pages/settings/IpAustralia.vue')},
      {path: 'profile/branddb', component: () => import('pages/settings/BrandDb.vue')},
      {path: 'profile/uk', component: () => import('pages/settings/Uk.vue')},
      {path: 'documents/assign', component: () => import('pages/templates/LTAssign.vue')},
      {path: 'documents/license', component: () => import('pages/templates/LTLicense.vue')},
      {path: 'documents/confidentiality', component: () => import('pages/templates/LTConfidentiality.vue')},
      {path: 'documents/cease', component: () => import('pages/templates/LTCease.vue')},
      {path: 'documents/defaults', component: () => import('pages/templates/LTDefaults.vue')},
      {path: 'calendar', component: () => import('pages/Calendar.vue')},
    ]
  },
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {path: '', component: () => import('pages/public/About.vue')},
      {path: 'about', component: () => import('pages/public/About.vue')},
      {path: 'pricing', component: () => import('pages/public/Pricing.vue')},
      {path: 'signup', component: () => import('pages/public/Signup.vue')},
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

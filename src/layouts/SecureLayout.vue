<template>
  <q-layout view="hHh lpR fFf">
    <!--  <q-layout view="lHh Lpr lFf">-->
    <q-header bordered :class="headerStyle">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          <div class="text-weight-light">Markster</div>
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn v-if="hasMarksterPermission" round dense flat color="white" icon="info" @click="alert = true">
          </q-btn>
          <q-btn round dense flat color="white" icon="alarm">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
<!--                <messages></messages>-->
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
<!--                <messages></messages>-->
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-item to="/logout" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="logout"/>
            </q-item-section>
            <q-tooltip>
              logout
            </q-tooltip>
          </q-item>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <q-item v-if="hasMarksterPermission" to="/secure/admin" active-class="q-item-no-link-highlighting" @click="selectedNav = 'admin'" :focused="selectedNav === 'admin'">
          <q-item-section avatar>
            <q-icon name="admin_panel_settings"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Markster Admin</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/secure/dashboard" active-class="q-item-no-link-highlighting" @click="selectedNav = 'dashboard'" :focused="selectedNav === 'dashboard'">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/secure/portfolio" active-class="q-item-no-link-highlighting" @click="selectedNav = 'portfolio'" :focused="selectedNav === 'portfolio'">
          <q-item-section avatar>
            <q-icon name="work_outline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Portfolio</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/secure/watch" active-class="q-item-no-link-highlighting" @click="selectedNav = 'watch'" :focused="selectedNav === 'watch'">
          <q-item-section avatar>
            <q-icon name="policy"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Watch Lists</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="gavel"
          label="Legal Templates"
        >
          <q-list class="q-pl-lg">
            <q-item to="/secure/documents/assign" active-class="q-item-no-link-highlighting" @click="selectedNav = 'assign'" :focused="selectedNav === 'assign'">
              <q-item-section avatar>
                <q-icon name="login"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Assign Trade Mark</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/secure/documents/license" active-class="q-item-no-link-highlighting" @click="selectedNav = 'license'" :focused="selectedNav === 'license'">
              <q-item-section avatar>
                <q-icon name="ios_share"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>License Trade Mark</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/secure/documents/confidentiality" active-class="q-item-no-link-highlighting" @click="selectedNav = 'confidentiality'" :focused="selectedNav === 'confidentiality'">
              <q-item-section avatar>
                <q-icon name="lock"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Confidentiality Agreement</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/secure/documents/cease" active-class="q-item-no-link-highlighting" @click="selectedNav = 'cease'" :focused="selectedNav === 'cease'">
              <q-item-section avatar>
                <q-icon name="close"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Cease & Desist</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/secure/documents/defaults" active-class="q-item-no-link-highlighting" @click="selectedNav = 'defaults'" :focused="selectedNav === 'defaults'">
              <q-item-section avatar>
                <q-icon name="tune"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Default Values</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item to="/secure/calendar" active-class="q-item-no-link-highlighting" @click="selectedNav = 'calendar'" :focused="selectedNav === 'calendar'">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Calendar</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="settings"
          label="Settings"
        >
          <q-list class="q-pl-lg">
            <q-item v-if="hasAdminPermission" to="/secure/profile/company" active-class="q-item-no-link-highlighting" @click="selectedNav = 'company'" :focused="selectedNav === 'company'">
              <q-item-section avatar>
                <q-icon name="business"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Company Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="hasAdminPermission" to="/secure/profile/ipaustralia" active-class="q-item-no-link-highlighting" @click="selectedNav = 'ipaustralia'" :focused="selectedNav === 'ipaustralia'">
              <q-item-section avatar>
                <q-icon name="home"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>IP Australia</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="hasAdminPermission" to="/secure/profile/branddb" active-class="q-item-no-link-highlighting" @click="selectedNav = 'branddb'" :focused="selectedNav === 'branddb'">
              <q-item-section avatar>
                <q-icon name="public"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Brand DB</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="hasAdminPermission" to="/secure/profile/uk" active-class="q-item-no-link-highlighting" @click="selectedNav = 'uk'" :focused="selectedNav === 'uk'">
              <q-item-section avatar>
                <q-icon name="public"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>United Kingdom</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          icon="admin_panel_settings"
          label="Admin"
        >
          <q-list class="q-pl-lg">
            <q-item to="/secure/admin/userprofile" active-class="q-item-no-link-highlighting" @click="selectedNav = 'userprofile'" :focused="selectedNav === 'userprofile'">
              <q-item-section avatar>
                <q-icon name="manage_accounts"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Your Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="hasAdminPermission" to="/secure/admin/companyprofile" active-class="q-item-no-link-highlighting" @click="selectedNav = 'companyprofile'" :focused="selectedNav === 'companyprofile'">
              <q-item-section avatar>
                <q-icon name="business"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Company Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="hasAdminPermission" to="/secure/admin/users" active-class="q-item-no-link-highlighting" @click="selectedNav = 'adminusers'" :focused="selectedNav === 'adminusers'">
              <q-item-section avatar>
                <q-icon name="people"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Users</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="hasAdminPermission" to="/secure/admin/roles" active-class="q-item-no-link-highlighting" @click="selectedNav = 'admin/roles'" :focused="selectedNav === 'admin/roles'">
              <q-item-section avatar>
                <q-icon name="lock"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Roles</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="hasAdminPermission" to="/secure/admin/ipgroups" active-class="q-item-no-link-highlighting" @click="selectedNav = 'admin/ipgroups'" :focused="selectedNav === 'admin/ipgroups'">
              <q-item-section avatar>
                <q-icon name="folder"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>IP Groups</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="hasAdminPermission" to="/secure/admin/external" active-class="q-item-no-link-highlighting" @click="selectedNav = 'admin/external'" :focused="selectedNav === 'admin/external'">
              <q-item-section avatar>
                <q-icon name="person_add"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>External Users</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :company-context-id="userInfo.company_id"/>
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Version Information</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-h6">GUI Info</div>
        <div class="text-subtitle2">Branch: {{guiBranch}}</div>
        <div class="text-subtitle2">Commit: {{guiCommitHash}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-h6">URL: {{apiServer}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-h6">API Info</div>
        <div class="text-subtitle2">Branch: {{apiBranch}}</div>
        <div class="text-subtitle2">Commit: {{apiCommitHash}}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import auth from '../auth'
import versionApi from '../api/version'


import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  data: function () {
    return {
      selectedNav: 'dashboard',
      companies: ['Markster', 'Megaport'],
      userInfo: {
        permission:[]
      },
      hasPreviewPermission: false,
      hasAdminPermission: false,
      hasMarksterPermission: false,
      headerStyle: process.env.HEADER_BACKGROUND,
      alert: false,
      guiCommitHash: process.env.GIT_SHA,
      apiCommitHash: '',
      apiBranch:'',
      guiBranch: process.env.GIT_BRANCH,
      apiServer: process.env.API,
    }
  },

  mounted() {
    let self = this
    this.userInfo = auth.getMarksterData()
    if (this.userInfo.permissions.includes('preview')) this.hasPreviewPermission = true;
    if (this.userInfo.permissions.includes('admin')) this.hasAdminPermission = true;
    if (this.userInfo.permissions.includes('markster')) this.hasMarksterPermission = true;
    versionApi.findApiVersionInfo().then(d => {
      self.apiCommitHash = d.data.data.version
      self.apiBranch = d.data.data.branch
    })
  }

})
</script>
<style scoped>
q-item-label {
  font-weight: lighter;
}
</style>

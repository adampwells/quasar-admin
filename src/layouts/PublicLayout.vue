<template>
  <q-layout view="hHh lpR fFf">
<!--  <q-layout view="lHh Lpr lFf">-->
    <q-header >
      <q-toolbar>
        <q-toolbar-title>
          Markster
        </q-toolbar-title>
        <q-space/>
        <q-tabs align="left">
          <q-route-tab to="/about" label="About" />
          <q-route-tab to="/pricing" label="Pricing" />
          <q-route-tab to="/signup" label="Sign Up" />
        </q-tabs>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-item to="/secure/dashboard" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="login"/>
            </q-item-section>
            <q-tooltip>
              login
            </q-tooltip>
          </q-item>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="bg-grey-2">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup () {}
})
</script>

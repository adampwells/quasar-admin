<template>
  <q-page class="q-pa-sm">
    about
    {{branch}}
    {{commitHash}}
    {{api}}
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "About",
  setup() {
    return {}
  },
  data() {
    return {
      commitHash: process.env.GIT_SHA ? process.env.GIT_SHA : process.env.CF_PAGES_COMMIT_SHA,
      branch: process.env.GIT_BRANCH ? process.env.GIT_BRANCH : process.env.CF_PAGES_BRANCH,
      api: process.env.API,
    }
  },
  mounted() {},
})
</script>

<style scoped>

</style>

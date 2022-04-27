<template>
  <q-page class="q-pa-sm">
    About Markster GUI
    Branch:{{branch}}<br>
    GIT Commit:{{commitHash}}<br>
    API: {{api}}<br>
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
      commitHash: process.env.GIT_SHA,
      branch: process.env.GIT_BRANCH,
      api: process.env.API,
    }
  },
  mounted() {},
})
</script>

<style scoped>

</style>

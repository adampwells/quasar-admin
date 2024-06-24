<template>
  <q-page class="q-pa-sm">
    We don't know you, you have to register your comapny details...
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "UnknownUser",
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

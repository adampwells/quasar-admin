<template>
  <q-page class="q-pa-sm">
    about
    {{branch}}
    {{commitHash}}
    {{api}}
    <pre>{{git}}</pre>
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
      git: process.env.GIT,
      branch: process.env.BRANCH,
      commitHash: process.env.COMMIT_HASH,
      api: process.env.API,
    }
  },
  mounted() {},
})
</script>

<style scoped>

</style>

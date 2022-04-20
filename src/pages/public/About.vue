<template>
  <q-page class="q-pa-sm">
    about
    {{branch}}
    {{commitHash}}
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
      branch: process.env.BRANCH,
      commitHash: process.env.COMMIT_HASH,
    }
  },
  mounted() {},
})
</script>

<style scoped>

</style>

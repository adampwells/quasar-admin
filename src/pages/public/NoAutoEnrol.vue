<template>
  <q-page class="q-pa-sm">
    You company is registered, but the account is set up so that people can't auto-enrol based on the same email domain.
    Please contact the person in your company that registered with Markster.
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "NoAutoEnrol",
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

<template>
  <q-page class="q-pa-sm">
    user profile
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "UserProfile",
  props: {
    companyContextId: String,
  },
  setup() {
    return {}
  },
  mounted() {},
})
</script>

<style scoped>

</style>

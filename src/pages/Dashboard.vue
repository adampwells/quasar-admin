<template>
  <q-page class="q-pa-sm">
    dashboard
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "Dashboard",
  props: {
    companyContextId: String,
  },
  components: {
  },
  setup() {
    return {}
  },
  data() {
    return {
    }
  },
  methods: {
    tokenCreated(t) {
      console.log(t)
    }
  },
  mounted() {
  },
})
</script>

<style scoped>

</style>

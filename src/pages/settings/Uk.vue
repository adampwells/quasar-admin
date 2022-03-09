<template>
  <q-page padding>
    United Kingdom
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "Uk",
  props: {
    companyContextId: String,
  },
  setup() {
    return {}
  },
  mounted() {},
  data: function () {
    return {
      search:'',
      results:['Megaport (Services) Pty Ltd', 'Megaport Pty Ltd']
    }
  }
})
</script>

<style scoped>

</style>

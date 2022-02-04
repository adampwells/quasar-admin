<template>
  <q-page class="q-pa-sm">
    Markster Admin
    {{apimessage}}
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {useQuasar} from 'quasar'
import {ref} from 'vue'
import companyApi from '../api/company'
export default defineComponent({
  name: "MarksterAdmin",
  setup() {
    const $q = useQuasar()
    return {}
  },
  data() {
    return {
      companies: [],
      apimessage:''
    }
  },
  methods: {
    findAllCompanies() {
      let self = this
      self.$q.loading.show()
      companyApi.findAllCompanies().then((result) => {
        self.companies = result.data
      }).catch((error) => {
        self.$q.notify({
          message: error.message,
          color:'accent'
        })
      })
      self.$q.loading.hide()
    }
  },
  mounted() {
    this.findAllCompanies()
  },
})
</script>

<style scoped>

</style>

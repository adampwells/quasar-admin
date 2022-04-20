<template>
  <q-page class="q-pa-sm">
    Markster Admin
    {{apimessage}}
    {{branch}}{{commitHash}}

  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import companyApi from '../api/company'
export default defineComponent({
  name: "MarksterAdmin",
  props: {
    companyContextId: String,
  },
  setup() {
    return {}
  },
  data() {
    return {
      companies: [],
      apimessage:'',
      branch: process.env.BRANCH,
      commitHash: process.env.COMMIT_HASH,
    }
  },
  methods: {
    findAllCompanies() {
      let self = this
      self.$q.loading.show()
      companyApi.findAllCompanies().then((result) => {
        self.companies = result.data.data
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

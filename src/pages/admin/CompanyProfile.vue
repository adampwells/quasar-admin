<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-weight-light text-h6">Company Details</div>
      </q-card-section>
      <q-card-section>
        <company-details :company="company" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import CompanyDetails from "components/CompanyDetails"
import companyApi from "src/api/company"
import auth from '../../auth'


export default defineComponent({
  name: "CompanyProfile",
  components: {CompanyDetails},
  props: {
    companyContextId: String,
  },
  setup() {
    return {}
  },
  data() {
    return {
      company:{},
      userInfo:{},
    }
  },
  mounted() {
    let self = this
    self.userInfo = auth.getMarksterData()
    self.$q.loading.show()
    companyApi.findCompanyDetails(self.userInfo.company_id).then((result) => {
      self.company = result.data.data
    }).catch((error) => {
      self.$q.notify({
        message: error.message,
        color:'accent'
      })
    })
    self.$q.loading.hide()
  },
})
</script>

<style scoped>

</style>

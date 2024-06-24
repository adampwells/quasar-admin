<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-input v-model="company.name" label="Company Name" outlined @keyup.enter="saveCompany"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.acn_arbn" label="ACN/ARBN" outlined @keyup.enter="saveCompany"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.email" label="Email" outlined @keyup.enter="saveCompany"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.web" label="Web" outlined @keyup.enter="saveCompany"/>
      </div>
    </div>
    <br/>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-input v-model="company.address1" label="Address 1" outlined @keyup.enter="saveCompany"/>
      </div>
      <div class="col-6">
        <q-input v-model="company.address2" label="Address 2" outlined @keyup.enter="saveCompany"/>
      </div>
    </div>
    <br/>
    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-input v-model="company.suburb" label="Town" outlined @keyup.enter="saveCompany"/>
      </div>
      <div class="col-3">
        <q-select v-model="company.state" :options="states" label="State" outlined @keyup.enter="saveCompany"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.postcode" label="Postcode" outlined @keyup.enter="saveCompany"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.phone" label="Phone" outlined @keyup.enter="saveCompany"/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import companyApi from "src/api/company"
import personApi from "src/api/person";

export default defineComponent({
  name: "CompanyDetails",
  props: {
    company: Object,
    saveOnEnter: Boolean,
  },
  setup() {
    return {}
  },
  data() {
    return {
      states:[
        'QLD',
        'NSW',
        'VIC',
        'ACT',
        'SA',
        'NT',
        'WA',
        'TAS',
      ]
    }
  },
  emits: ['updated'],
  methods: {
    saveCompany() {
      let self = this
      if (self.saveOnEnter){
        companyApi.saveCompanyDetails(self.company).then((result) => {
          self.$emit('updated', self.company)
          self.$q.notify({
            message: 'Company updated',
            color: 'primary'
          })
        }).catch((error) => {
          console.log(error)
          self.$q.notify({
            message: error.response.data.message,
            color: 'accent'
          })
        })
      }
    },

  },
  mounted() {},
})
</script>

<style scoped>

</style>

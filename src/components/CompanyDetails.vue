<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-input v-model="company.name" label="Company Name" outlined @keyup="$emit('updated', company)"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.acn_arbn" label="ACN/ARBN" outlined @keyup="$emit('updated', company)"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.email" label="Email" outlined @keyup="$emit('updated', company)"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.web" label="Web" outlined @keyup="$emit('updated', company)"/>
      </div>
    </div>
    <br/>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-input v-model="company.address1" label="Address 1" outlined @keyup="$emit('updated', company)"/>
      </div>
      <div class="col-6">
        <q-input v-model="company.address2" label="Address 2" outlined @keyup="$emit('updated', company)"/>
      </div>
    </div>
    <br/>
    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-input v-model="company.suburb" label="Town" outlined @keyup="$emit('updated', company)"/>
      </div>
      <div class="col-3">
        <q-select v-model="company.state" :options="states" label="State" outlined @keyup="$emit('updated', company)"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.postcode" label="Postcode" outlined @keyup="$emit('updated', company)"/>
      </div>
      <div class="col-3">
        <q-input v-model="company.phone" label="Phone" outlined @keyup="$emit('updated', company)"/>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "CompanyDetails",
  props: {
    company: Object,
  },
  setup() {
    return {}
  },
  emits: {
    updated(company){
      // updated company details
    }
  },
  mounted() {},
})
</script>

<style scoped>

</style>

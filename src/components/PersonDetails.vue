<template>
  <div>
    <div class="row q-col-gutter-md justify-around">
      <div class="col-4">
        <q-input v-model="person.first_name" label="First Name" outlined @keyup="$emit('updated', person)"/>
      </div>
      <div class="col-4">
        <q-input v-model="person.last_name" label="Last Name" outlined @keyup="$emit('updated', person)"/>
      </div>
    </div>
    <br>
    <div class="row q-col-gutter-md justify-around">
      <div class="col-4">
        <q-input v-model="person.email" label="Email" outlined @keyup="$emit('updated', person)"/>
      </div>
      <div class="col-4">
        <q-input v-model="person.phone" label="Phone" outlined @keyup="$emit('updated', person)"/>
      </div>
    </div>

  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "PersonDetails",
  props: {
    person: Object,
  },
  setup() {
    return {}
  },
  emits: {
    updated(person){
      // updated person details
    }
  },
  mounted() {},
})
</script>

<style scoped>

</style>

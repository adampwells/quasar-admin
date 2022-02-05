<template>
  <q-page class="q-pa-sm">
     <q-card flat bordered>
       <q-card-section>
         <div class="text-weight-light text-h6">Users</div>
         <q-table bordered flat
          :rows="people"
         />
       </q-card-section>
     </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import {useQuasar} from 'quasar'
import companyApi from '../../api/company'

export default defineComponent({
  name: "Users",
  setup() {
    return {}
  },
  data(){
    return {
      people:[]
    }
  },
  methods: {
    findPeopleByCompanyId(){
      let self = this
      self.$q.loading.show()
      companyApi.findPeopleByCompanyContext().then((result) => {
        self.people = result.data.data
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
    this.findPeopleByCompanyId()
  },
})
</script>

<style scoped>

</style>

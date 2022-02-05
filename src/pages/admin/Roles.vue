<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-weight-light text-h6">Roles</div>

      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import {useQuasar} from 'quasar'
import companyApi from "src/api/company";

export default defineComponent({
  name: "Roles",
  setup() {
    const $q = useQuasar()
    return {}
  },
  data(){
    return {
      roles:[]
    }
  },
  methods: {
    findRolesByCompanyContext(){
      let self = this
      self.$q.loading.show()
      companyApi.findRolesByCompanyContext().then((result) => {
        self.roles = result.data.data
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
    this.findRolesByCompanyContext()
  },
})
</script>

<style scoped>

</style>

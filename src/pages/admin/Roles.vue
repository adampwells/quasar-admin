<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-weight-light text-h6">Security Roles</div>
      </q-card-section>
      <q-card-section>
        <q-table flat bordered
                 title="Administrators - write access"
                 :rows-per-page-options="[0]"
                 :rows="adminPeople"
                 :columns="columns"
                 hide-bottom
        />
      </q-card-section>
      <q-card-section>
        <q-table flat bordered
                 title="Users - read access"
                 :rows-per-page-options="[0]"
                 :rows="userPeople"
                 :columns="columns"
                 hide-bottom
        />
      </q-card-section>
      <q-card-section>
        <q-table flat bordered
                 title="Invited External Attorneys - write access"
                 :rows-per-page-options="[0]"
                 :rows="externalPeople"
                 :columns="columns"
                 hide-bottom
        />
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
  props: {
    companyContextId: String,
  },
  setup() {
    const $q = useQuasar()
    return {}
  },
  data() {
    return {
      adminPeople: [],
      userPeople: [],
      externalPeople: [],
      columns: [
        {
          name: 'firstName',
          label: 'First Name',
          field: 'first_name',
          align: 'left',
          sortable: true
        },
        {
          name: 'lastName',
          label: 'Last Name',
          field: 'last_name',
          align: 'left',
          sortable: true
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          align: 'left',
          sortable: true
        },
        {
          name: 'phone',
          label: 'Phone',
          field: 'phone',
          align: 'left',
          sortable: true
        },
      ],
    }
  },
  methods: {
    findRolesByCompanyContext() {
      let self = this
      self.$q.loading.show()
      companyApi.findRolesByCompanyContext().then((result) => {
        result.data.data.forEach( (role) => {
          if (role.name === 'administrator') {
            self.adminPeople = role.people ? role.people : []
          } else if (role.name === 'administrator') {
            self.userPeople = role.people ? role.people : []
          } else {
            self.externalPeople = role.people ? role.people : []
          }
        })
        self.roles = result.data.data
      }).catch((error) => {
        self.$q.notify({
          message: error.message,
          color: 'accent'
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

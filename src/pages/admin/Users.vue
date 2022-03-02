<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-weight-light text-h6">Your Users</div>
      </q-card-section>
      <q-card-section>
        <q-table  flat bordered
                  :rows-per-page-options="[0]"
                 :rows="people"
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
import companyApi from '../../api/company'

export default defineComponent({
  name: "Users",
  setup() {
    return {}
  },
  data() {
    return {
      people: [],
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
    findPeopleByCompanyId() {
      let self = this
      self.$q.loading.show()
      companyApi.findPeopleByCompanyContext().then((result) => {
        self.people = result.data.data
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
    this.findPeopleByCompanyId()
  },
})
</script>

<style scoped>

</style>

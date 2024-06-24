<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <q-card-section>

        <q-tabs
          v-model="tab"
          narrow-indicator
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="list" label="Users"/>
          <q-tab name="detail" label="User Detail"/>
        </q-tabs>
        <q-separator/>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="list">
            <q-card flat>
              <q-card-section>
                <q-btn class="text-white bg-primary" @click="displayNewUserScreen">New User</q-btn>
              </q-card-section>
              <q-card-section>
                <q-table flat bordered
                         :rows-per-page-options="[0]"
                         :rows="people"
                         :columns="columns"
                         @row-click="showUserDetail"
                >
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn v-if="!people[props.rowIndex].enabled"
                        dense
                        round
                        flat
                        color="grey"
                        @click.stop="enableDisable(props)"
                        icon="person_add"
                      ><q-tooltip>
                        Enable user
                      </q-tooltip></q-btn>
                      <q-btn v-if="people[props.rowIndex].enabled"
                        dense
                        round
                        flat
                        color="grey"
                        @click.stop="enableDisable(props)"
                        icon="person_remove"
                      ><q-tooltip>
                        Disable user
                      </q-tooltip></q-btn>
                    </q-td>
                  </template>

                </q-table>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="detail">
            <person-details :person="person" @updated="(p) => { person = p }"/>
            <br>
            <div class="row q-col-gutter-md justify-center">
              <div class="col-auto">
                <q-btn class="bg-accent text-white" @click="tab = 'list'">Cancel</q-btn>
              </div>
              <div class="col-auto">
                <q-btn class="bg-primary text-white" @click="saveUser">Save</q-btn>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>

      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import {useQuasar} from 'quasar'
import companyApi from '../../api/company'
import personApi from '../../api/person'
import PersonDetails from "components/PersonDetails";
import auth from "src/auth";

export default defineComponent({
  name: "Users",
  components: {PersonDetails},
  props: {
    companyContextId: String,
  },
  setup() {
    return {
      tab: ref('list')
    }
  },
  data() {
    return {
      people: [],
      person: {
        "email": '',
        "first_name": '',
        "last_name": '',
        "company_id": '',
        "phone": '',
        "enabled": true,
      },
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
        {
          name: 'enabled',
          label: 'Enabled',
          field: 'enabled',
          align: 'left',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          field: '',
          align: 'right',
          sortable: false
        },

      ],
    }
  },
  methods: {
    saveUser() {
      let self = this
      personApi.upsertUser(self.person).then((result) => {
        self.$q.notify({
          message: 'User updated',
          color: 'primary'
        })
        this.findPeopleByCompanyId(this.companyContextId)
        self.tab = 'list'

      }).catch((error) => {
        console.log(error)
        self.$q.notify({
          message: error.response.data.message,
          color: 'accent'
        })
      })
    },
    enableDisable(props){
      let self = this
      personApi.enableDisablePerson(props.row.person_id).then((result) => {
        self.$q.notify({
          message: 'User updated',
          color: 'primary'
        })
        self.people[props.rowIndex].enabled = !self.people[props.rowIndex].enabled
      }).catch((error) => {
        console.log(error)
        self.$q.notify({
          message: error.response.data.message,
          color: 'accent'
        })
      })
    },
    showUserDetail(event, row, index) {
      this.person = row
      if (this.person.roles.length > 0) {
        this.role = this.person.roles[0]
      }
      this.tab = 'detail'
    },
    displayNewUserScreen() {
      this.person = {
        email: '',
        first_name: '',
        last_name: '',
        company_id: this.companyContextId,
        phone: '',
        enabled: true,
      }
      this.tab = 'detail'
    },
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
    let self = this
    self.userInfo = auth.getMarksterData()
    this.findPeopleByCompanyId()
  },
})
</script>

<style scoped>

</style>

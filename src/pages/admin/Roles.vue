<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-weight-light text-h6">Security Roles</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md justify-center items-center">
          <div class="col-auto">
            Add
          </div>
          <div class="col-3">
            <q-select outlined dense :options="allUsers" :option-label="u => u.first_name + ' ' + u.last_name" v-model="selectedUser"></q-select>
          </div>
          <div class="col-auto">
            to Group
          </div>
          <div class="col-3">
            <q-select outlined dense :options="groups" v-model="selectedGroup"></q-select>
          </div>
          <div class="col-auto">
            <q-btn dense @click="addUserToGroup">Add</q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-tooltip hide-delay="500" anchor="top middle">Administrators can add, remove, disable and enable standard
          Users
        </q-tooltip>
        <q-table flat bordered
                 title="Administrators"
                 :rows-per-page-options="[0]"
                 :rows="adminPeople"
                 :columns="columns"
                 hide-bottom
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense
                     round
                     flat
                     color="grey"
                     @click.stop="removeUserFromGroup(props.row.person_id, 'administrators')"
                     icon="person_remove"
              >
                <q-tooltip>
                  Reomove user from group
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-tooltip anchor="top middle">Standard users of the system</q-tooltip>
        <q-table flat bordered
                 title="Users"
                 :rows-per-page-options="[0]"
                 :rows="userPeople"
                 :columns="columns"
                 hide-bottom
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense
                     round
                     flat
                     color="grey"
                     @click.stop="removeUserFromGroup(props.row.person_id, 'users')"
                     icon="person_remove"
              >
                <q-tooltip>
                  Reomove user from group
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-tooltip anchor="top middle">Previewers are able to see preview GUI features while they are in development
        </q-tooltip>
        <q-table flat bordered
                 title="Previewers"
                 :rows-per-page-options="[0]"
                 :rows="previewPeople"
                 :columns="columns"
                 hide-bottom
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense
                     round
                     flat
                     color="grey"
                     @click.stop="removeUserFromGroup(props.row.person_id, 'previewers')"
                     icon="person_remove"
              >
                <q-tooltip>
                  Reomove user from group
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-tooltip anchor="top middle">You can invite external attorneys to manage your portfolio in your behalf
        </q-tooltip>
        <q-table flat bordered
                 title="Invited External Attorneys"
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
      selectedGroup: undefined,
      selectedUser: undefined,
      groups:["administrators", "users", "previewers"],
      allUsers: [],
      adminPeople: [],
      userPeople: [],
      previewPeople: [],
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
    addUserToGroup() {
      console.log('add ' + this.selectedUser.person_id + ' to ' + this.selectedGroup)
    },
    removeUserFromGroup(person_id, group) {
      console.log('remove ' + person_id + ' from ' + group)
    },
    findAllUsers() {
      let self = this
      self.$q.loading.show()
      companyApi.findPeopleByCompanyContext().then((result) => {
        self.allUsers = result.data.data
      }).catch((error) => {
        self.$q.notify({
          message: error.message,
          color: 'accent'
        })
      })
      self.$q.loading.hide()
    },
    findRolesByCompanyContext() {
      let self = this
      self.$q.loading.show()
      companyApi.findRolesByCompanyContext().then((result) => {
        result.data.data.forEach((role) => {
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
    this.findAllUsers()
  },
})
</script>

<style scoped>

</style>

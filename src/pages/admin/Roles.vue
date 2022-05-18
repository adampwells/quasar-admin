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
            to Role
          </div>
          <div class="col-3">
            <q-select outlined dense :options="roleNames" v-model="selectedRole"></q-select>
          </div>
          <div class="col-auto">
            <q-btn dense @click="addUserToRole">Add</q-btn>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-tooltip anchor="top middle">Administrators can add, remove, disable and enable standard
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
                     @click.stop="removeUserFromRole(props.row, 'administrator')"
                     icon="person_remove"
              >
                <q-tooltip>
                  Reomove user from role
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-tooltip anchor="top middle">Standard users of the system</q-tooltip>
        <q-table flat bordered
                 title="User"
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
                     @click.stop="removeUserFromRole(props.row, 'user')"
                     icon="person_remove"
              >
                <q-tooltip>
                  Reomove user from role
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
                     @click.stop="removeUserFromRole(props.row, 'previewer')"
                     icon="person_remove"
              >
                <q-tooltip>
                  Reomove user from role
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
import securityApi from "src/api/security";
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
      selectedRole: undefined,
      selectedUser: undefined,
      roles: [],
      roleNames:["administrator", "user", "previewer"],
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
    addUserToRole() {
      let self = this
      console.log('add ' + this.selectedUser.person_id + ' to ' + this.selectedRole)
      securityApi.addUserToRole(this.selectedRole, this.selectedUser.person_id).catch((error) => {
        self.$q.notify({
          message: error.message,
          color: 'accent'
        })
      })
      switch(this.selectedRole){
        case 'user':
          self.userPeople.push(this.selectedUser)
          break
        case 'administrator':
          self.adminPeople.push(this.selectedUser)
          break
        case 'previewer':
          self.previewPeople.push(this.selectedUser)
          break
      }
    },
    removeUserFromRole(person, role) {
      let self = this
      console.log('remove ' + person.person_id + ' from ' + role)
      securityApi.removeUserFromRole(role, person.person_id).catch((error) => {
        self.$q.notify({
          message: error.message,
          color: 'accent'
        })
      })
      var idx = -1
      self.userPeople.forEach((p, i) => {
        if (p.person_id = person.person_id) {
          idx = i
          console.log('found index ' + idx)
        }
      })
      switch(this.selectedRole){
        case 'user':
          self.userPeople.splice(idx,1)
          break
        case 'administrator':
          self.adminPeople.splice(idx,1)
          break
        case 'previewer':
          self.previewPeople.splice(idx,1)
          break
      }
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
          } else if (role.name === 'user') {
            self.userPeople = role.people ? role.people : []
          } else if (role.name === 'previewer') {
            self.previewPeople = role.people ? role.people : []
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

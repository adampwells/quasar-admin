<template>
  <q-page class="q-pa-sm">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-weight-light text-h6">Your Profile</div>
      </q-card-section>
      <q-card-section>
        <person-details :person="person" @updated="savePerson()"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import personApi from '../../api/person'
import PersonDetails from "components/PersonDetails";
import auth from "src/auth";

import {ref} from 'vue'

export default defineComponent({
  name: "UserProfile",
  components: {PersonDetails},
  props: {
    companyContextId: String,
  },
  setup() {
    return {}
  },
  data() {
    return {
      person: {
        "email": '',
        "first_name": '',
        "last_name": '',
        "company_id": '',
        "phone": '',
        "enabled": true,
      },
    }
  },
  mounted() {
    this.findCurrentUser()
  },
  methods: {
    findCurrentUser() {
      let self = this
      personApi.findCurrentUser().then((result) => {
        self.person = result.data.data
      }).catch((error) => {
        console.log(error)
        self.$q.notify({
          message: error.response.data.message,
          color: 'accent'
        })
      })
    },
    savePerson(){
      let self = this
      personApi.upsertUser(self.person).then((result) => {
        self.$q.notify({
          message: 'User updated',
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
  }
})
</script>

<style scoped>

</style>

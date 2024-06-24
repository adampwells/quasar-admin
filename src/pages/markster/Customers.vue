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
          <q-tab name="list" label="Customers"/>
          <q-tab name="detail" label="Customer Detail"/>
        </q-tabs>
        <q-separator/>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="list">
            <q-card flat>
              <q-card-section>
                <q-table flat bordered
                         :rows-per-page-options="[0]"
                         :rows="companies"
                >
                  <template v-slot:body-cell-actions="props">
                  </template>

                </q-table>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="detail">
            Company Detail
          </q-tab-panel>
        </q-tab-panels>

      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import companyApi from '../../api/company'
export default defineComponent({
  name: "Customers",
  props: {
    companyContextId: String,
  },
  setup() {
    return {}
  },
  data() {
    return {
      tab: 'list',
      companies: [],
    }
  },
  methods: {
    findAllCompanies() {
      let self = this
      self.$q.loading.show()
      companyApi.findAllCompanies().then((result) => {
        self.companies = result.data.data
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
    this.findAllCompanies()
  },
})
</script>

<style scoped>

</style>

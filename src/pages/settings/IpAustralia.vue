<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">IP Australia Configuration</div>
        <p>
          Searching IP Australia is based on the specific name of the owning entity, as recorded by IP Australia. It is common to have your company name in IP Australia's database with different spellings etc.
        </p>
        <p>
          In order to accurately identify you trade marks, we need to the precise set of company names with which to search the IP Australia database. You can search for your company names using a substring search, and then choose the ones that own your marks. We will use those to manage your portfolio from IP Australia.
        </p>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-card>
              <q-card-section>
                <div class="text-h6">Search IP Australia Company Names</div>
              </q-card-section>
              <q-separator/>
              <q-card-section>
                <q-input v-model="search" label="Name or part name"></q-input>
                <br>
                <q-btn color="primary">Search IP Australia</q-btn>
                <br>
                <br>
                <q-list>
                  <q-item v-for="r in results">
                    <q-item-section>{{r}}</q-item-section>
                    <q-item-section side>
                      <q-btn color="secondary">Use</q-btn>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6">
            <q-card>
              <q-card-section>
                <div class="text-h6">Selected Company Names</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
      <br>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "IpAustralia",
  props: {
    companyContextId: String,
  },
  setup() {
    return {}
  },
  mounted() {},
  data: function () {
    return {
      search:'',
      results:['Megaport (Services) Pty Ltd', 'Megaport Pty Ltd']
    }
  }
})
</script>

<style scoped>

</style>

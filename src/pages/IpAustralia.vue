<template>
  <q-page padding>
    <div class="row justify-around">
      <div class="col-auto">
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
      <div class="col-auto">
        <q-card>
          <q-card-section>
            <div class="text-h6">Company Names for Searches</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "IpAustralia",
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

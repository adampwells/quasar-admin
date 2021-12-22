<template>
  <q-card class="text-white" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="text-h6 text-center">
        World Domination
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <div class="text-h3 text-weight-bolder text-center">
        <q-icon name="apartment"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="text-h4 text-weight-bolder text-center">
        $2 per trade mark
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        Manage any number of trade marks globally
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-center">
      Integration with IP Australia, Brand DB, UK Trademarks, HK Trademarks, and more coming!
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-center">
      OAuth Security, federated OAuth
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-center">
      Portfolio Management
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-center">
      Calendar
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-center">
      Activity Reporting
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-center">
      Kate sings Happy Birthday
    </q-card-section>
    <q-separator/>
    <q-card-actions vertical align="center">
      <q-btn class="text-capitalize bg-indigo-8" color="">Register with Credit Card</q-btn>
    </q-card-actions>
    <q-separator/>
    <q-card-section class="text-center">
      Watch Intro Video
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardFree",
  props: ['background_image']
})
</script>

<style scoped>

</style>

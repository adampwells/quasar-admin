<template>
  <q-card class="text-white" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="text-h6 text-center">
        Free Tier
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <div class="text-h3 text-weight-bolder text-center">
        <q-icon name="cabin"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="text-h4 text-weight-bolder text-center">
        $0
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        Manage up to 10 trade marks registered with IP Australia
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-center">
      Integration with IP Australia
    </q-card-section>
    <q-separator/>
    <q-card-section class="text-center">
      OAuth Security
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
      Email on your Birthday
    </q-card-section>
    <q-separator/>
    <q-card-actions vertical align="center">
      <q-btn class="text-capitalize bg-indigo-8" color="">Register for Free Tier Access</q-btn>
    </q-card-actions>
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

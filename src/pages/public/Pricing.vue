<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-x-lg justify-around">

    </div>
    <div class="row q-col-gutter-x-lg justify-around">
      <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
        <card-free class="q-mt-lg" :background_image="background_img2"></card-free>
      </div>
      <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
        <card-australia class="q-mt-lg" :background_image="background_img1"></card-australia>
      </div>
      <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
        <card-world class="q-mt-lg" :background_image="background_img2"></card-world>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue'

export default defineComponent({
  name: "Cards",
  components: {
    CardFree: defineAsyncComponent(() => import('components/cards/CardFree')),
    CardAustralia: defineAsyncComponent(() => import('components/cards/CardAustralia')),
    CardWorld: defineAsyncComponent(() => import('components/cards/CardWorld')),
  },
  setup() {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    return {
      background_img1: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
      background_img2: 'linear-gradient(87deg, rgb(45, 206, 137), rgb(45, 206, 204)) !important'
    }
  },
})
</script>

<style scoped>

</style>

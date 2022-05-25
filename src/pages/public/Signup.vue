<template>
  <q-page class="q-pa-md row justify-center">
    <registration :secure="false"></registration>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import Registration from "components/Registration";

export default defineComponent({
  name: "Signup",
  components: {Registration},
  setup() {
    return {}
  },
  data() {
    return {}
  },
  created() {
  },
  async mounted() {},
  methods: {}
})
</script>

<style scoped>
</style>

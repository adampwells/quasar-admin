<template>
  <q-page class="q-pa-sm bg-white">
    <div class="window-height window-width row justify-center items-center">
      <q-card flat>
        <q-card-section>
          <div class="text-h6">
            You are now logged out.
          </div>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>

import {defineComponent} from 'vue'
export default defineComponent({
  name: 'Logout',
  components: {},
  data() {
    return {}
  }
})
</script>

<style>
.my-event {
  position: relative;
  font-size: 12px;
  width: 100%;
  margin: 1px 0 0 0;
  justify-content: center;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}

.title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.text-white {
  color: white
}

.bg-blue {
  background: blue
}

.bg-green {
  background: green
}

.bg-orange {
  background: orange
}

.bg-red {
  background: red
}

.bg-teal {
  background: teal
}

.bg-grey {
  background: grey
}

.bg-purple {
  background: purple
}

.rounded-border {
  border-radius: 2px
}

abbr.tooltip {
  text-decoration: none
}
</style>

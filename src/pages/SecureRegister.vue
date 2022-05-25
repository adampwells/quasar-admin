<template>
  <q-page class="q-pa-sm bg-white">
    <div class="window-height window-width row justify-center items-center">
      <q-card flat>
        <q-card-section class="q-pa-md">
          <div class="text-weight-light text-h6 col-3">
            Hi there {{userInfo.email}}.
          </div>
          <br>
          <div class="text-weight-light col-3">
            You have successfully logged in, but we have not been able to match you to a registered company by looking at your email address domain.
          </div>
          <br>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>

import {defineComponent} from 'vue'
import auth from '../auth'
export default defineComponent({
  name: 'Register',
  components: {},
  data() {
    return {
      userInfo: {}
    }
  },
  mounted(){
    this.userInfo = auth.getMarksterData()
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

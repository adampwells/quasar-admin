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
            You have successfully logged in, but we have not been able to match you to a registered company by looking at your email address domain so you are in a holding pattern for now!
          </div>
          <br>
          <div class="text-weight-light" col-3>
            To automatically link new users with a parent company, the company admin has to record a domain from which it will accept all users.<br>
            You should first follow up with that person to check for typos, or contact us at <a href="mailto: info@markster.com.au">info@markster.com.au</a>.
          </div>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>

import {defineComponent} from 'vue'
import auth from '../auth'
export default defineComponent({
  name: 'Floater',
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

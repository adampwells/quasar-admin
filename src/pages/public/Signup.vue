<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12" style="max-width: 1200px">
        <q-stepper

          v-model="step"
          ref="stepper"
          color="primary"
          animated
        >
          <q-step
            :name="1"
            title="Subscription"
            icon="shopping_cart"
            active-icon="shopping_cart"
            :done="step > 1"
          >
            CHoose a plan
          </q-step>

          <q-step
            :name="2"
            title="Company Details"
            icon="business"
            active-icon="business"
            :done="step > 2"
          >
            An ad group contains one or more ads which target a shared set of keywords.
          </q-step>

          <q-step
            :name="3"
            title="People"
            icon="people"
            active-icon="people"
            :done="step > 3"
          >
            An ad group contains one or more ads which target a shared set of keywords.
          </q-step>


          <q-step
            :name="4"
            title="IP Australia Setup"
            icon="tune"
            active-icon="tune"
          >
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with
            your ads, find out how to tell if they're running and how to resolve approval issues.
          </q-step>

          <q-step
            :name="4"
            title="Payment"
            icon="payment"
            active-icon="payment"
          >
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with
            your ads, find out how to tell if they're running and how to resolve approval issues.
          </q-step>

          <q-step
            :name="4"
            title="Orientation"
            icon="explore"
          >
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with
            your ads, find out how to tell if they're running and how to resolve approval issues.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "Signup",
  setup() {
    return {
      step: ref(1)
    }
  },
  mounted() {},
})
</script>

<style scoped>

</style>

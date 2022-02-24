<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12" style="max-width: 1200px">
        <q-stepper

          v-model="step"
          ref="stepper"
          color="primary"
          animated
          @transition="checkView"
        >
          <q-step
            :name="1"
            title="Subscription"
            icon="shopping_cart"
            active-icon="shopping_cart"
            :done="step > 1"
            style="height: 400px"
          >
            <q-list>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="reg.plan" val="plan1"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Free Tier</q-item-label>
                  <q-item-label caption>Free forever in the Australian market.</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="reg.plan" val="plan2"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Australia Unlimited</q-item-label>
                  <q-item-label caption>Manage any number of trade marks registered with IP Australia.</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="reg.plan" val="plan3"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>World Conquest</q-item-label>
                  <q-item-label caption>We help manage the messiness that is the international IP scene.</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

          </q-step>

          <q-step
            :name="2"
            title="Company Details"
            icon="business"
            active-icon="business"
            :done="step > 2"
            style="height: 400px"
          >
            <company-details :company="reg.company" @updated="(c) => reg.company = c"/>
          </q-step>

          <q-step
            :name="3"
            title="Company Admin"
            icon="people"
            active-icon="people"
            :done="step > 3"
            style="height: 400px"
          >
            <div class="text-body2 text-weight-light">The administrator user can create other users who can login to
              Markster.
            </div>
            <div class="text-body2 text-weight-light">We will email you a temporary password which you will need to
              reset to complete the registration process.
            </div>
            <br>
            <person-details :person="reg.administrator" @updated="(p) => reg.administrator = p"/>
            <br>
            <div class="text-body2 text-weight-light">You can allow users to sign up by themselves and we will add them to your account if the email domain matches the one you provide. This is an easy way of giving your whole company read-only access to Markster.</div>
            <br>
            <div class="text-body2 text-weight-light">Just leave the field blank if you don't want to allow this.</div>
            <br>
            <div class="row q-col-gutter-md justify-around">
              <div class="col-4">
                <q-input v-model="reg.company.auto_register_domain" label="Auto Register Domain" outlined/>
              </div>
            </div>

          </q-step>


          <q-step
            :name="4"
            title="IP Australia Setup"
            icon="tune"
            active-icon="tune"
            :done="step > 4"
            style="height: 400px"
          >
            <div class="text-body2 text-weight-light">
              Markster integrates with IP Australia to automate searches and other actions on your behalf. We identify
              trademarks based on the registered owner of the given mark. It is common to have several different owner
              names in the IP Australia database, so you should record all of the names you are known by in IP
              Australia.
            </div>
            <br>
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-input v-model="ip_australia_name" label="Company Name"/>
              </div>
              <div class="col-2">
                <q-btn round icon="add"
                       @click="reg.ip_australia_names.push(ip_australia_name); ip_australia_name = ''"/>
              </div>
            </div>
            <br>
            <div class="row">
              <q-list bordered separator>
                <q-item v-for="n in reg.ip_australia_names">
                  <q-item-section>{{ n }}</q-item-section>
                  <q-item-section side>
                    <q-btn round icon="remove" @click="removeItem(n)" v-ripple/>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-step>

          <q-step
            :name="5"
            title="Payment"
            icon="payment"
            active-icon="payment"
            :done="step > 5"
            style="height: 400px"
          >
            <div class="text-body2 text-weight-light">
              We use Stripe for payment processing. We do not store credit card details at all on our infrastructure -
              not even transiently in server memory.
            </div>
            <br>
            <div class="text-body2 text-weight-light">
              We will process you credit card on the monthly anniversary of signup for the number of active trademarks
              owned by your company.
            </div>
            <br>
            <div class="row q-col-gutter-md justify-center">
              <div class="col-6">
                <q-card flat bordered>
                  <q-card-section>
                    <div ref="card" class="q-mt-lg stripeElement"/>
                    <div
                      v-if="stripeError"
                      class="q-pa-sm text-accent"
                      v-html="stripeError"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <br>
            <q-btn @click="registerCard">Register Card</q-btn>
          </q-step>

          <q-step
            :name="6"
            title="Welcome Aboard!"
            icon="explore"
            :done="step === 6"
            style="height: 400px"
          >
            <p class="text-weight-light">Thank you for signing up with Markster.</p>
            <p class="text-weight-light">You should receive an email confirmation shortly - please check your spam if it does not show up in your inbox!</p>
            <p class="text-weight-light">Once you have validated your email you will be able to <router-link to="/secure/dashboard">go to your dashboard.</router-link></p>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="step < 6" @click="handleStep" color="primary" :label="step === 5 ? 'Complete Registration' : 'Continue'"/>
              <q-btn v-if="step > 1 && step < 6" flat color="primary" @click="$refs.stepper.previous()" label="Back"
                     class="q-ml-sm"/>
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
import stripeApi from '../../api/stripe'
import {loadStripe} from '@stripe/stripe-js'
import regApi from '../../api/registration'
import CompanyDetails from "components/CompanyDetails";
import PersonDetails from "components/PersonDetails";

export default defineComponent({
  name: "Signup",
  components: {PersonDetails, CompanyDetails},
  setup() {
    return {
      step: ref(1),
    }
  },
  data() {
    return {
      clientSecret: '',
      elements: undefined,
      stripe: undefined,
      card: undefined,
      stripeEvent: undefined,
      stripeError: '',
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      states: [
        'ACT',
        'NSW',
        'NT',
        'QLD',
        'SA',
        'TAS',
        'VIC',
        'WA',
      ],
      ip_australia_name: '',
      reg: {
        company: {
          name: '',
          email: '',
          phone: '+61',
          acn_arbn: '',
          address1: '',
          address2: '',
          suburb: '',
          state: '',
          country: 'Australia',
          postcode: '',
          roles: [],
          auto_register_domain: ''
        },
        administrator: {
          first_name: '',
          last_name: '',
          email: '',
          phone: '+61',
        },
        plan: 'plan2',
        ip_australia_names: [],
        stripe_token: undefined,
      },
    }
  },
  created() {
  },
  async mounted() {
    stripeApi.findClientSecret().then((resp) => {
      self.clientSecret = resp.data.data.clientSecret
    })
  },
  methods: {
    handleStep(){
      if (this.step === 5) {
        regApi.registerNewAccount(this.reg)
      }
      this.$refs.stepper.next()
    },
    checkView(newView, oldView) {
      console.log(`new ${newView} old ${oldView}`)
      if (this.step === 5) {
        this.setupStripe()
      }
    },
    async setupStripe() {
      let self = this
      self.stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
      self.elements = self.stripe.elements()
      self.card = self.elements.create('card')
      self.card.mount(this.$refs.card)
      self.card.on('change', function (event) {
        self.stripeEvent = !event.empty
      })
    },
    async registerCard() {
      let self = this
      if (self.stripeEvent) {

        self.stripeError = null
        const stripePm = await self.stripe.createPaymentMethod({
          type: 'card',
          card: self.card,
          billing_details: {
            name: self.reg.administrator.first_name,
            email: self.reg.administrator.email,
            phone: self.reg.administrator.phone,
            address: {
              line1: self.reg.company.address1 + ' ' + self.reg.company.address2 + ' ' + self.reg.company.suburb
            }
          }
        })

        if (stripePm?.error?.message) {
          self.stripeError = stripePm.error.message
          return
        }

        self.reg.stripeToken = stripePm?.paymentMethod?.id
        self.$q.notify({
          message: 'Card registered successfully.',
          color: 'green-3'
        })
      }
    },
    removeItem(item) {
      this.reg.ip_australia_names.splice(this.reg.ip_australia_names.indexOf(item), 1)
    },
    tokenCreated(token) {
      console.log(token)
    }
  }
})
</script>

<style scoped>
</style>

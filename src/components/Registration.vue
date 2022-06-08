<template>
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
          style="height: 560px"
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
          style="height: 560px"
        >
          <company-details :save-on-enter="false" :company="reg.company" @updated="(c) => reg.company = c"/>
        </q-step>

        <q-step
          :name="3"
          title="Company Admin"
          icon="people"
          active-icon="people"
          :done="step > 3"
          style="height: 560px"
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
          <div class="text-body2 text-weight-light">This app is protected using OAuth provided by Amazon Cognito, and that service is federated with Google so that you can login using your Google identity - <i>as long as it matches the email provided above.</i> Alternately, we can create a user account in Cogito on your behalf using the email above.</div>
          <br>
          <div class="row">
            <div class="col-4 offset-1"><q-radio v-model="reg.login" val="federated">I'll login using my existing Google account.</q-radio></div>
          </div>
          <div class="row">
          <div class="col-1 offset-1"><b>OR</b></div>

          </div>
          <div class="row vertical-middle">
            <div class="col-4 offset-1"><q-radio v-model="reg.login" val="password">Create a new account for me with this username:</q-radio></div>
            <div class="col-4">
              <q-input label="Username" v-model="reg.administrator.username" outlined @blur="checkUsername" ref="username"></q-input>
            </div>
          </div>
          <br>
          <div class="text-body2 text-weight-light">You can allow users to sign up by themselves and we will add them to your account if the email domain matches the one you provide.</div>
          <br>
          <div class="row q-col-gutter-md justify-around">
            <div class="col-4">
              <q-input v-model="reg.company.domain" label="Auto Register Domain" outlined/>
            </div>
          </div>

        </q-step>


        <q-step
          :name="4"
          title="IP Australia Setup"
          icon="tune"
          active-icon="tune"
          :done="step > 4"
          style="height: 560px"
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
          style="height: 560px"
          v-if="reg.plan != 'plan1'"
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
          <p class="text-weight-light">Thank you for signing up with Markster!</p>
          <p class="text-weight-light" v-if="password !== ''">Your temporary password is {{password}}. You will be asked to change it when you first sign in.</p>
          <p class="text-weight-light">To login you can click on the icon on the top right of this screen, or <router-link to="/secure/dashboard">click here to go to your dashboard.</router-link></p>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn v-if=" step < 6" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm"/>&nbsp;
            <q-btn v-if="step < 6" @click="handleStep" color="primary" :label="step === 5 || (step === 4 && reg.plan === 'plan1') ? 'Complete Registration' : 'Continue'"/>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import stripeApi from '../api/stripe'
import {loadStripe} from '@stripe/stripe-js'
import regApi from '../api/registration'
import CompanyDetails from "components/CompanyDetails";
import PersonDetails from "components/PersonDetails";

export default defineComponent({
  name: "Registration",
  components: {PersonDetails, CompanyDetails},
  props: {
    secure: Boolean
  },
  setup() {
    return {
      step: ref(1),
    }
  },
  data() {
    return {
      password: '',
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
          domain: '',
        },
        administrator: {
          username: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: '+61',
        },
        login:'password',
        plan: 'plan2',
        secure: false,
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
    checkUsername() {
      console.log('check username')
      let self = this
      regApi.isUsernameAvailable(self.reg.administrator.username).then((result)=>{
        if (!result.data.data.available) {
          self.$q.notify({
            message: "That username is not available. Please choose a unique username with 1 to 128 characters.",
            color: 'accent'
          })
          self.reg.administrator.username = result.data.data.alternative
          self.$refs.username.focus()
        }
      }).catch((error) => {
        console.log(error)
        self.$q.notify({
          message: error.response.data.message,
          color: 'accent'
        })
      })
    },
    handleStep(){
      let self = this
      if (this.step === 5 || (this.step === 4 && this.reg.plan === 'plan1')) {
        self.reg.secure = self.secure
        regApi.registerNewAccount(this.reg).then((response) => {
          self.password = response.data.data.password
        })
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

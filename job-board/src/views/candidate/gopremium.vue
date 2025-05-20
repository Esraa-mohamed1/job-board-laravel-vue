<template>
  <div class="container my-5">
    <div class="card p-4 shadow">
      <h2 class="mb-3">Upgrade to Premium</h2>
      <p class="mb-4">
        Subscribe for <strong>$10/month</strong> and apply to unlimited jobs!
      </p>

      <div id="card-element" class="mb-4"></div>
      <button class="btn btn-primary" @click="handleSubscribe" :disabled="loading">
        {{ loading ? 'Processing...' : 'Subscribe Now' }}
      </button>

      <div v-if="error" class="text-danger mt-3">{{ error }}</div>
      <div v-if="success" class="text-success mt-3">{{ success }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51OiLR4EI022bdeAWbHKBYqgPrQBKTXEFEUr7fbrvFRic2OsAFEUSs1tgsJG6aaSoL88nyCOpfL7xQgjwLcowPCPF00fVMpPj3W') 
axios.defaults.headers.common['Authorization'] =
  `Bearer ${localStorage.getItem('authToken')}`;



const loading = ref(false)
const error = ref('')
const success = ref('')
let stripe = null
let elements = null
let card = null

onMounted(async () => {
  stripe = await stripePromise
  elements = stripe.elements()
  card = elements.create('card')
  card.mount('#card-element')
})

const handleSubscribe = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
    type: 'card',
    card: card,
  })

  if (stripeError) {
    error.value = stripeError.message
    loading.value = false
    return
  }

  try {
    const { data } = await axios.post('http://127.0.0.1:8000/api/subscribe', {
      payment_method: paymentMethod.id,
    })

    if (data.redirect) {
      window.location.href = data.redirect
    } else {
      success.value = 'Subscription successful! '
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Subscription failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
#card-element {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}
</style>

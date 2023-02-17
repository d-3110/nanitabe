<script setup lang="ts">
import { useForm, useField, useIsFormDirty, useIsFormValid } from 'vee-validate'
import { object, string } from 'yup'
definePageMeta({
  layout: false,
})

const schema = object({
  email: string().required('メアド入れてちょうだい'),
  password: string().required('password入れてちょうだい')
})
const { validate, resetForm } = useForm({ validationSchema: schema })
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const loading = ref<boolean>(true)

const user = useSupabaseUser()
const { auth } = useSupabaseClient()
watchEffect(async () => {
  const session = await auth.getSession()
  if (session.data.session && user.value) {
    await navigateTo('/gacha')
  }
  loading.value = false
})

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();
const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value;
})
const loginError = ref<boolean>(false)

const login = async () => {
  const result = await validate()
  if (result.valid) {
    const { data, error } = await auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) {
      loginError.value = true
    } else {
      navigateTo('/gacha')
    }
  }
}

// 登録用
const register = async () => {
  await auth.signUp({
    email: email.value,
    password: password.value,
  });
}

</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
    <Spinner v-if="loading" />
    <LoginCard v-else="loading">
      <form class="prose">
        <input type="text" v-model="email" placeholder="email" class="input input-bordered w-full max-w-xs mb-2">
        <small v-if="emailError"><span class="text-error">{{ emailError }}</span></small>
        <input type="password" v-model="password" placeholder="password" class="input input-bordered w-full max-w-xs mb-4">
        <small v-if="passwordError"><span class="text-error">{{ passwordError }}</span></small>
        <button @click="login" class="btn btn-lg btn-primary w-full" type="button" :disabled="isDisabled">
          Login
        </button>
        <!-- <button @click="register" class="btn btn-lg btn-primary w-full" type="button">register</button> -->
      </form>
    </LoginCard>
    <div v-if="loginError" class="alert alert-error shadow-lg mt-4 min-h-full sm:px-6 lg:px-8 w-96">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-4" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error!</span>
      </div>
    </div>
  </div>
</template>
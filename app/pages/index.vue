<script setup lang="ts">
definePageMeta({
  layout: false,
});
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
watchEffect(() => {
  if (user.value) {
    navigateTo('/gacha')
  }
})
</script>

<template>
  <div class="min-h-full flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
    <LoginCard>
      <button @click="auth.signInWithOAuth({ provider: 'github' })" class="btn btn-lg btn-primary w-full" type="button">Login</button>
    </LoginCard>
  </div>
</template>
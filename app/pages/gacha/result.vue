<script setup lang="ts">
import { useRoute, useRouter} from 'vue-router'

definePageMeta({
  middleware: 'auth'
})
onMounted(() => {
  if (route.query.id == '' || route.query.name == '') {
    return navigateTo('/gacha')
  }
})
const buttonDisabled = ref<boolean>(false)
const route = useRoute()
const router = useRouter()
const saveHistroy = async () => {
  buttonDisabled.value = true
  const { data } = await useFetch('/api/v1/history', {
    method: 'post',
    body: { meal_id: route.query.id},
  })
  router.go(-1)
}
const oneMore = () => {
  buttonDisabled.value = true
  router.go(-1)
}
</script>
<template>
  <div class="flex flex-col justify-center items-center prose">
      <h3>結果</h3>
      <div>
        <h1>{{ $route.query.name }}</h1>
      </div>
      <button @click="saveHistroy" class="btn btn-lg btn-primary w-full mb-4" :disabled="buttonDisabled">履歴保存</button>
      <button @click="oneMore" class="btn btn-lg btn-secondary w-full" :disabled="buttonDisabled">もう一回！</button>
  </div>
</template>
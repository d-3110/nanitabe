<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { data: histories } = await useFetch('/api/v1/history')
const headers = ref<Array<string>>(['date', 'meal'])
const records = computed(() => {
  let result = <Array<object>>([])
  histories!.value.forEach((history :any) => {
    const date = formatDate(new Date(history.created_at), true)
    result.push({ date: date, meal: history.meals.name })
  })
  return result
})
</script>
<template>
  <div>
    <Table :headers="headers" :records="records" />
  </div>
</template>
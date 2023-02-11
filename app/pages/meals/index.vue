<script setup lang="ts">
import { type } from 'os';

definePageMeta({
  middleware: 'auth'
})
const { data: meals } = await useFetch('/api/v1/meal')
const headers = ref<Array<string>>(['id', 'name', 'note', 'type', 'tag'])
const records = computed(() => {
  let result = <Array<object>>([])
    meals!.value.forEach((meal :any) => {
    const type = convertMealType(meal.type)
    result.push({ id: meal.id, name: meal.name, note: meal.note, type: type, tag: meal.tag })
  })
  return result
})
</script>
<template>
  <div>
    <Table :headers="headers" :records="records" />
  </div>
</template>
<template>
  <div>
    <h1>食事Page</h1>
    <ul>
      <li v-for="meal in meals" :key="meal.id">{{ meal.name }}</li>
    </ul>
  </div>
</template>
<script setup>
const { data: meals } = useFetch('/api/v1/meal')
const { data: options } = ['foo','bar','baz']
</script>
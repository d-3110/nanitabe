<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const { data: tags } = await useFetch('/api/v1/tag')
onMounted(async () => {
  //
})
</script>
<template>
  <div>
    <NuxtLink
      v-for="tag in tags"
      class="badge mr-2 text-white"
      :style="'background-color:' + tag.color + ';border-color:' + tag.color"
      :to="'/tags/' + tag.id"
    >
      {{ tag.name }}
    </NuxtLink>
  </div>
</template>
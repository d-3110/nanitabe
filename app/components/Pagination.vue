<script setup lang="ts">
interface Props {
  pages: number
  current: number
  url: string
}
const props = withDefaults(defineProps<Props>(), {
  pages: 1,
  current: 1,
  url: '',
})
const getPath = ((n :number) => {
  return props.url + '?page=' + n
})
</script>
<template>
  <div class="flex justify-center mt-2">
    <ul class="btn-group">
        <li v-if="current > 1" class="btn">
          <NuxtLink :to="getPath(current - 1)">{{ '<' }}</NuxtLink>
        </li>
        <li v-if="3 < current" class="btn">
          <NuxtLink :to="getPath(1)">1</NuxtLink>
        </li>
        <li v-if="4 < current" class="btn btn-disabled">
          <span>...</span>
        </li>
        <li
            v-for="p in pages"
            :key="p"
            v-show="current - 2 <= p && p <= current + 2"
            class="btn"
            :class="{ 'btn-active': current === p }"
        >
          <NuxtLink :to="getPath(p)">{{ p }}</NuxtLink>
        </li>
        <li v-if="current + 3 < pages" class="btn btn-disabled">
          <span>...</span>
        </li>
        <li v-if="current + 2 < pages" class="btn">
          <NuxtLink :to="getPath(pages)">{{ pages }}</NuxtLink>
        </li>
        <li v-if="current < pages" class="btn">
          <NuxtLink :to="getPath(current + 1)" >{{ '>' }}</NuxtLink>
        </li>
    </ul>
</div>
</template>
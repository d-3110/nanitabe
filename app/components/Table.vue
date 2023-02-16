<script setup lang="ts">
interface Props {
  headers: Array<string>
  records: Array<object>
}
const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  records: () => []
})
</script>
<template>
  <div class="overflow-x-auto">
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records">
          <td v-for="item in record">
            <nuxt-link v-if="'link' in item" :to="item.link" class="link link-primary">
              {{ item.value }}
            </nuxt-link>
            <span v-else>
              {{ item.value }}
            </span>
          </td> 
        </tr>
      </tbody>
    </table>
  </div>
</template>
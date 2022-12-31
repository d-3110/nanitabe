<script setup lang="ts">
interface Props {
  headers: Array<string>;
  data: Array<object>;
}
const props = withDefaults(defineProps<Props>(), {
  headers: () => ['id', 'name', 'created'],
  data: () => [{ id: 1, name: '名前', created: '2022-12-01' }]
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
        <tr v-for="line in data">
          <td v-for="item in line">{{ item }}</td> 
        </tr>
      </tbody>
    </table>
  </div>
</template>
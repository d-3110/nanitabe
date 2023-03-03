<script setup lang="ts">
interface Props {
  selectedTags: Array<string>
  options: Array<any>
  handleInput: Function
  handleDelete: Function
}
const props = withDefaults(defineProps<Props>(), {
  selectedTags: () => [],
  current: () => [],
  handleInput: () => {},
  handleDelete: () => {},
})

const selected = computed({
  get() {
    return props.selectedTags
  },
  set(value) {
    props.handleInput(value)
  }
})
</script>
<template>
  <v-select
    class="flex justify-center items-center input input-bordered w-full max-w-xs"
    v-model="selected"
    :options="options"
    multiple
    placeholder="タグ"
  />
  <!-- <div v-for="tag in selected" class="badge">
    {{ tag }}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  </div> -->
</template>
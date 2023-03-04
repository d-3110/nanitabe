<script setup lang="ts">
interface Props {
  selectedTags: Array<string>
  tags: Array<any>
  handleInput: Function
  taggable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  selectedTags: () => [],
  current: () => [],
  handleInput: () => {},
  taggable: false
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
    class="flex justify-center items-center input input-bordered w-full max-w-xs h-auto"
    v-model="selected"
    :options="tags"
    :deselectFromDropdown="true"
    :closeOnSelect="false"
    maxHeight="400px"
    label="name"
    multiple
    :taggable=taggable
    placeholder="タグ"
  >
    <template #option="{ name, color }">
      <div class="badge text-white" :style="'background-color:' + color + ';border-color:' + color">
        {{ name }}
      </div>
    </template>
    <template #selected-option-container="{ option, deselect, multiple }">
      <div class="badge flex justify-center items-center mr-1 text-white" :style="'background-color:' + option.color + ';border-color:' + option.color">
        {{ option.name }}
        <div @click="deselect(option)" class="ml-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
      </div>
    </template>
  </v-select>
</template>
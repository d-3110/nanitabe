<script setup lang="ts">

interface Props {
  headers: Array<string>
  records: Array<any>
  withCheckBox?: boolean
  handleCheck?: Function
  handleBulkSubmit?: Function
  bulkSubmitButton?: string
}
const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  records: () => [{}],
  withCheckBox: false,
  handleCheck: () => {},
  handleBulkSubmit: () => {},
  bulkSubmitButton: '削除'
})
const checkedList = ref<Array<number>>([])
const isAll = ref<boolean>(false)
const checkAll = () => {
  checkedList.value = []
  if (isAll.value) {
    let cnt: any = props.records.length
    for (let i = 0; i < cnt; i++) {
      checkedList.value.push(i)
    }
  }
  props.handleCheck(checkedList.value)
}
watchEffect(() => {
  isAll.value = checkedList.value.length == props.records.length
})
</script>
<template>
  <div class="overflow-x-auto">
    <button
      v-if="withCheckBox"
      class="btn btn-sm btn-secondary mb-4"
      :disabled="checkedList.length == 0"
      @click="handleBulkSubmit()"
    >
      {{ bulkSubmitButton }}
    </button>
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th v-if="withCheckBox">
            <label>
              <input type="checkbox" class="checkbox" v-model="isAll" @change="checkAll" />
            </label>
          </th>
          <th v-for="header in headers" :key="header">{{ header }}</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, i) in records">
          <td v-if="withCheckBox">
            <label>
              <input
                type="checkbox"
                class="checkbox"
                :value="i"
                v-model="checkedList"
                @change="handleCheck(i)"
              />
            </label>
          </td>
          <td v-for="item in record">
            <NuxtLink v-if="'link' in item" :to="item.link" class="link link-primary">
              {{ item.value }}
            </NuxtLink>
            <span v-else>
              {{ item.value }}
            </span>
          </td> 
        </tr>
      </tbody>
    </table>
  </div>
</template>
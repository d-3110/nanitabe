<script setup lang="ts">
const { data: tags } = useFetch('/api/v1/tag')
const isError = ref<Boolean>(false)
const isDisabled = ref<Boolean>(false)
const isModal = ref<Boolean>(false)
const type = ref<Number>(0)
const name = ref<String>('')
const note = ref<String>('')
const selectedTags = ref<Array<Number>>([])

const options = computed(() => {
  let result = <Array<String>>([])
  tags.value!.forEach(tag => {
    result.push(tag.name)
  })
  return result
})
const submit = async () => {
  isDisabled.value = true
  const { data } = await useFetch('/api/v1/meal', {
    method: 'post',
    body: { type: type.value, name: name.value, note: note.value, tags: selectedTags.value },
  })
  isModal.value = true
}
const onCloseModal = () => {
  isModal.value = false
  isDisabled.value = false
  type.value = 0
  name.value = ''
  note.value = ''
  selectedTags.value = []
}
</script>
<template>
  <div>
    <Modal :onCloseModal="onCloseModal" :open="isModal" message="登録完了!" />
    <form class="prose">
      <h3 class="flex justify-center">食事追加</h3>
      <div class="flex">
        <div class="mr-4">
          <label for="type_in" class="label-text mr-2">家</label>
          <input v-model="type" id="type_in" value="0" type="radio" class="radio" />
        </div>
        <div>
          <label for="type_out" class="label-text mr-2">外</label>
          <input v-model="type" id="type_out" value="1" type="radio" class="radio" />
        </div>
      </div>
      <div class="mt-4">
        <input v-model="name" type="text" placeholder="食事名" class="input input-bordered w-full max-w-xs" />
        <label class="label">
          <span v-if="isError" class="label-text-alt text-error">エラー</span>
        </label>
      </div>
      <div class="mt-4">
        <textarea v-model="note" class="textarea textarea-bordered w-full" placeholder="メモ"></textarea>
      </div>
      <div>
        <label>タグ</label>
        <v-select
          class="flex justify-center items-center input input-bordered w-full max-w-xs"
          v-model="selectedTags"
          :options="options"
          multiple
          taggable
        />
      </div>
      <div class="flex justify-center items-center mt-4">
        <button @click="submit" class="btn btn-lg btn-primary w-full"  type="button" :disabled="isDisabled">登録</button>
      </div>
    </form>
  </div>
</template>
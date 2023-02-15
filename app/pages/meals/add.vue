<script setup lang="ts">
import { useForm, useField, useIsFormDirty, useIsFormValid } from 'vee-validate'
import { object, string } from 'yup'
definePageMeta({
  middleware: 'auth'
})

const schema = object({
  name: string().required('名前は入れてちょうだい')
})
const { validate, resetForm } = useForm({ validationSchema: schema })
const { value: name, errorMessage: nameError } = useField<string>('name')

const { data: tags } = await useFetch('/api/v1/tag')

const isModal = ref<Boolean>(false)
const buttonDisabled = ref<Boolean>(false)
const type = ref<Number>(0)
const note = ref<String>('')
const selectedTags = ref<Array<Number>>([])

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();
const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value;
})
const options = computed(() => {
  let result = <Array<String>>([])
  tags!.value.forEach((tag :any) => {
    result.push(tag.name)
  })
  return result
})

const submit = async () => {
  const result = await validate()
  if (result.valid) {
    buttonDisabled.value = true
    const { data } = await useFetch('/api/v1/meal', {
      method: 'post',
      body: { type: type.value, name: name.value, note: note.value, tags: selectedTags.value },
    })
    isModal.value = true
  }
}
const onCloseModal = () => {
  isModal.value = false
  buttonDisabled.value = false
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
          <small v-if="nameError"><span class="text-error">{{ nameError }}</span></small>
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
        <button @click="submit" class="btn btn-lg btn-primary w-full" type="button" :disabled="isDisabled || buttonDisabled">登録</button>
      </div>
    </form>
  </div>
</template>
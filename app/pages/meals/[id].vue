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

const isModal = ref<boolean>(false)
const buttonDisabled = ref<boolean>(false)
const type = ref<Number>(0)
const note = ref<string>('')
const selectedTags = ref<Array<any>>([])

const isDirty = useIsFormDirty()
const isValid = useIsFormValid()
const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value || buttonDisabled.value
})
const route = useRoute()

onMounted(async () => {
  await fetch()
})

const fetch = async () => {
  const { data } = await useFetch('/api/v1/meal/' + route.params.id)
  const meal: any = data.value
  type.value = meal.type
  name.value = meal.name
  note.value = meal.note
  selectedTags.value = convertTagObjects(tags, meal.tag)
}

const submit = async () => {
  const result = await validate()
  if (result.valid) {
    buttonDisabled.value = true
    const { data } = await useFetch('/api/v1/meal/' + route.params.id, {
      method: 'put',
      body: { type: type.value, name: name.value, note: note.value, tags: convertTagNames(selectedTags.value) },
    })
    isModal.value = true
  }
}
const onCloseModal = () => {
  isModal.value = false
  buttonDisabled.value = false
  return navigateTo({
    path: '/meals',
  })
}
const handleSelectTag = (value: Array<any>) => {
  selectedTags.value = value
}
</script>
<template>
  <div>
    <Modal :onCloseModal="onCloseModal" :open="isModal" message="更新完了!" />
    <form class="prose">
      <h3 class="flex justify-center">食事編集</h3>
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
        <label v-if="nameError" class="label">
          <small><span class="text-error">{{ nameError }}</span></small>
        </label>
      </div>
      <div class="mt-2">
        <textarea v-model="note" class="textarea textarea-bordered w-full" placeholder="メモ"></textarea>
      </div>
      <div>
        <SelectTag
          :selectedTags="selectedTags"
          :tags="tags"
          :handleInput="handleSelectTag"
          :taggable="true"
        />
      </div>
      <div class="flex justify-center items-center mt-4">
        <button @click="submit" class="btn btn-lg btn-primary w-full" type="button" :disabled="isDisabled">更新</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useForm, useField, useIsFormDirty, useIsFormValid } from 'vee-validate'
import { object, string } from 'yup'
definePageMeta({
  middleware: 'auth'
})

const schema = object({
  name: string().required('名前は入れてちょうだい'),
})
const { validate, resetForm } = useForm({ validationSchema: schema })
const { value: name, errorMessage: nameError } = useField<string>('name')
const color = ref<string>('')

const isModal = ref<boolean>(false)
const buttonDisabled = ref<boolean>(false)
const type = ref<Number>(0)
const note = ref<string>('')
const selectedTags = ref<Array<Number>>([])

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
  const { data } = await useFetch('/api/v1/tag/' + route.params.id)
  const tag: any = data.value
  name.value = tag.name
  color.value = tag.color
}

const submit = async () => {
  const result = await validate()
  if (result.valid) {
    buttonDisabled.value = true
    const { data } = await useFetch('/api/v1/tag/' + route.params.id, {
      method: 'put',
      body: { color: color.value },
    })
    isModal.value = true
  }
}
const onCloseModal = () => {
  isModal.value = false
  buttonDisabled.value = false
  return navigateTo({
    path: '/tags',
  })
}
</script>
<template>
  <div>
    <Modal :onCloseModal="onCloseModal" :open="isModal" message="更新完了!" />
    <form class="prose">
      <h3 class="flex justify-center">タグ編集</h3>
      <!-- <div class="mt-4">
        <input v-model="name" type="text" placeholder="タグ名" class="input input-bordered w-full max-w-xs" disabled/>
        <label v-if="nameError" class="label">
          <small><span class="text-error">{{ nameError }}</span></small>
        </label>
      </div> -->
      <div class="mt-4 flex items-center">
        <VSwatches v-model="color" popover-x="left"/>
        <div class="mx-4">プレビュー:</div>
        <div class="badge mr-2 text-white" :style="'background-color:' + color + ';border-color:' + color">
          {{ name }}
        </div>
      </div>
      <div class="flex justify-center items-center mt-4">
        <button @click="submit" class="btn btn-lg btn-primary w-full" type="button" :disabled="isDisabled">更新</button>
      </div>
    </form>
  </div>
</template>
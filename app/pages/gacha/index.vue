<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import { useForm, useField, useIsFormDirty, useIsFormValid } from 'vee-validate'
import { object, string } from 'yup'

const schema = object({
  from: string().required('fromは必須'),
  to: string().required('toは必須')
})
const { validate, resetForm } = useForm({ validationSchema: schema })
const { value: from, errorMessage: fromError } = useField<string>('from')
  const { value: to, errorMessage: toError } = useField<string>('to')

const { data: tags } = await useFetch('/api/v1/tag', {
  headers: useRequestHeaders(['cookie'])
})
const types = ref<Array<Number>>([0, 1])
const selectedTags = ref<Array<Number>>([])
const buttonDisabled = ref<Boolean>(false)

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

onMounted(() => {
  // set default Date
  var today = new Date()
  var oneWeekBefore = new Date()
  oneWeekBefore.setDate(oneWeekBefore.getDate() - 7)
  from.value = formatDate(oneWeekBefore)
  to.value = formatDate(today)
})
const formatDate = (dt :Date) => {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
}
const submit = async () => {
  const result = await validate()
  if (result.valid) {
    buttonDisabled.value = true
    const { data } = await useFetch('/api/v1/gacha', {
      params: {
        types: types.value.length === 0 ? [0, 1] : types.value,
        from: from.value + ' 00:00' ,
        to: to.value + ' 23:59',
        tags: selectedTags.value
      },
      headers: useRequestHeaders(['cookie']),
    })
    return navigateTo({
      path: '/gacha/result',
      query: { id: data.value.id, name: data.value.name }
    })
  }
}
</script>
<template>
  <div class="prose">
    <div class="flex">
      <div class="mr-4">
        <label for="type_in" class="label-text mr-2">家</label>
        <input id="type_in" v-model="types" value="0" type="checkbox" class="checkbox" />
      </div>
      <div>
        <label for="type_out" class="label-text mr-2">外</label>
        <input id="type_out" v-model="types" value="1" type="checkbox" class="checkbox" />
      </div>
    </div>
    <div>
      <div class="flex items-center mt-4">
        <input
          type="date"
          v-model="from"
          onfocus="this.type='date'"
          onblur="this.type='text'"
          placeholder="除外期間FROM"
          class="input input-bordered w-full max-w-xs"
          />
        <span class="mx-2">〜</span>
        <input
          type="date"
          v-model="to"
          onfocus="this.type='date'"
          onblur="this.type='text'"
          placeholder="除外期間TO"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <label class="label">
        <small v-if="fromError"><span class="text-error">{{ fromError }}</span></small>
        <small v-if="toError"><span class="text-error">{{ toError }}</span></small>
      </label>
    </div>
    <div>
      <label>タグ</label>
      <v-select
        class="flex justify-center items-center input input-bordered w-full max-w-xs"
        v-model="selectedTags"
        :options="options"
        multiple
      />
    </div>
    <div class="flex justify-center items-center mt-4">
      <button @click="submit" class="btn btn-lg btn-primary w-full" :disabled="isDisabled || buttonDisabled">ガチャガチャ</button>
    </div>
  </div>
</template>
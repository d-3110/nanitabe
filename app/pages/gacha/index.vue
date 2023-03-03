<script setup lang="ts">
import { useForm, useField, useIsFormDirty, useIsFormValid } from 'vee-validate'
import { object, string } from 'yup'
definePageMeta({
  middleware: 'auth'
})

const schema = object({
  from: string().required('fromは必須'),
  to: string()
      .required()
      .test('', '日付の前後が不正', (to: any, context) => {
        const fromDate: Date = new Date(context.parent.from)
        const toDate: Date = new Date(to)
        return fromDate <= toDate
      })
})
const { validate, resetForm } = useForm({ validationSchema: schema })
const { value: from, errorMessage: fromError } = useField<string>('from')
const { value: to, errorMessage: toError } = useField<string>('to')
const tmpFrom = ref<string>('')
const tmpTo = ref<string>('')

const { data: tags } = await useFetch('/api/v1/tag')
const types = ref<Array<Number>>([0, 1])
const selectedTags = ref<Array<Number>>([])
const isTagAnd = ref<boolean>(false)
const buttonDisabled = ref<boolean>(false)
const isAll = ref<boolean>(true)

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();
const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value || buttonDisabled.value
})

const options = computed(() => {
  return makeTagOptions(tags.value)
})

onMounted(() => {
  // set default Date
  setDefaultDate()
  tmpFrom.value = from.value
  tmpTo.value = to.value
})
const setDefaultDate = () => {
  let defaultDate = getDefaultDate()
  from.value = defaultDate.from
  to.value = defaultDate.to
}
const changeIsAll = () => {
  if (isAll.value) {
    tmpFrom.value = from.value
    tmpTo.value = to.value
    setDefaultDate()
  } else {
    from.value = tmpFrom.value
    to.value = tmpTo.value
  }
}
const submit = async () => {
  const result = await validate()
  if (result.valid) {
    buttonDisabled.value = true
    const { data } = await useFetch('/api/v1/gacha', {
      params: {
        types: types.value.length === 0 ? [0, 1] : types.value,
        isAll: isAll.value,
        from: from.value + ' 00:00' ,
        to: to.value + ' 23:59',
        tags: selectedTags.value,
        isTagAnd: isTagAnd.value
      }
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
        <input id="type_in" v-model="types" value="0" type="checkbox" class="checkbox checkbox-secondary" />
      </div>
      <div>
        <label for="type_out" class="label-text mr-2">外</label>
        <input id="type_out" v-model="types" value="1" type="checkbox" class="checkbox checkbox-secondary" />
      </div>
    </div>
    <div class="flex mt-4 mb-2">
      <label for="is_all" class="label-text mr-2">除外しない</label>
      <input @change="changeIsAll" id="is_all" type="checkbox" v-model="isAll" class="toggle toggle-secondary" />
    </div>
    <div v-if="!isAll">
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
    <div class="flex items-center">
      <v-select
        class="flex justify-center items-center input input-bordered w-full max-w-xs"
        v-model="selectedTags"
        :options="options"
        multiple
        placeholder="タグ"
      />
      <label for="type_in" class="label-text mx-2">AND</label>
        <input id="type_in" v-model="isTagAnd" value="0" type="checkbox" class="checkbox checkbox-secondary" />
    </div>
    <div class="flex justify-center items-center mt-4">
      <button @click="submit" class="btn btn-lg btn-primary w-full" :disabled="isDisabled">ガチャガチャ</button>
    </div>
  </div>
</template>
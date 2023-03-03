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
const { data: tags } = await useFetch('/api/v1/tag')
const { validate, resetForm } = useForm({ validationSchema: schema })
const { value: from, errorMessage: fromError } = useField<string>('from')
const { value: to, errorMessage: toError } = useField<string>('to')
const tmpFrom = ref<string>('')
const tmpTo = ref<string>('')
const route = useRoute()
const page = ref<number>('page' in route.query ? Number(route.query.page) : 1)
const pages = ref<number>(0)

const buttonDisabled = ref<boolean>(false)
const isAll = ref<boolean>(true)
const histories = ref<Array<any>>([])
const headers = ref<Array<string>>(['date', 'meal', 'tag'])

const records = computed(() => {
  let result = <Array<object>>([])
  histories!.value.forEach((history :any) => {
    const date = formatDate(new Date(history.created_at), true)
    result.push({
      date: { value: date },
      meal: { value: history.meals.name, link: 'meals/' + history.meal_id },
      tag: { value: history.meals.tag }
    })
  })
  return result
})

const isDirty = useIsFormDirty();
const isValid = useIsFormValid();
const isDisabled = computed(() => {
  return !isDirty.value || !isValid.value || buttonDisabled.value
})
const tagColors = computed(() => {
  return makeTagColors(tags.value)
})
onMounted(async () => {
  setDefaultDate()
  tmpFrom.value = from.value
  tmpTo.value = to.value
  await search()
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

const search = async () => {
  buttonDisabled.value = true
  const result = await validate()
  if (result.valid) {
    const { data } = await useFetch('/api/v1/history', {
      params: {
        from: from.value + ' 00:00' ,
        to: to.value + ' 23:59',
        isAll: isAll.value,
        page: page.value
      }
    })
    histories.value = data.value!.histories
    pages.value = Math.floor(data.value!.count / PAGE_SIZE)
  }
  buttonDisabled.value = false
}

const checkedList = ref<Array<number>>([])
const onCheck = (check: any) => {
  if (Array.isArray(check)) {
    checkedList.value = check
    return
  }
  if (checkedList.value.includes(check)) {
    checkedList.value = checkedList.value.filter((checked: number) => {
      return checked !== check
    })
  } else {
    checkedList.value.push(check)
  }
}

const onBulkDelete = async () => {
  isModal.value = true
}

const execDelete = async () => {
  let ids: Array<number> = []
  histories.value.forEach((history :any, index) => {
    if (checkedList.value.includes(index)) {
      ids.push(history.id)
    }
  })
  const { data } = await useFetch('/api/v1/history', {
    method: 'delete',
    body: { ids: ids },
  })
}

const isModal = ref<boolean>(false)
const modalLoading = ref<boolean>(false)
const onCloseModal = async (ok: boolean) => {
  if (ok) {
    modalLoading.value = true
    await execDelete()
    await search()
    modalLoading.value = false
  }
  isModal.value = false
}

onBeforeRouteUpdate(async (to, _from, next) => {
  // クエリだけ変更してもページの再レンダリングが走らないため、データを再取得する
  page.value = Number(to.query.page)
  await search()
  next()
})
</script>
<template>
  <div>
    <Confirm :onCloseModal="onCloseModal" :open="isModal" message="削除してもいい？" :loading="modalLoading"/>
    <form class="prose mb-5">
      <div class="flex mt-4 mb-2">
        <label for="is_all" class="label-text mr-2">全期間</label>
        <input @change="changeIsAll" id="is_all" type="checkbox" v-model="isAll" class="toggle toggle-secondary" />
      </div>
      <div class="mb-4" v-if="!isAll">
        <div class="flex items-center mt-4">
          <input
            type="date"
            v-model="from"
            onfocus="this.type='date'"
            onblur="this.type='text'"
            placeholder="期間FROM"
            class="input input-bordered w-full max-w-xs"
            />
          <span class="mx-2">〜</span>
          <input
            type="date"
            v-model="to"
            onfocus="this.type='date'"
            onblur="this.type='text'"
            placeholder="期間TO"
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <label class="label" v-if="fromError || toError">
          <small v-if="fromError"><span class="text-error">{{ fromError }}</span></small>
          <small v-if="toError"><span class="text-error">{{ toError }}</span></small>
        </label>
      </div>
      <button @click="search" class="btn btn-lg btn-primary w-full" type="button" :disabled="isDisabled">
        検索
      </button>
    </form>
    <div class="divider"></div>
    <Table
      :headers="headers"
      :records="records"
      :tagColors="tagColors"
      :with-check-box="true"
      :handle-check="onCheck"
      :handle-bulk-submit="onBulkDelete"
    />
    <Pagination
      :pages="pages"
      :current="page"
      :url="route.path"
    />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const buttonDisabled = ref<boolean>(false)
const { data: tags } = await useFetch('/api/v1/tag')
const types = ref<Array<Number>>([0, 1])
const selectedTags = ref<Array<Number>>([])
const isTagAnd = ref<boolean>(false)
const name = ref<string>('')
const meals = ref<Array<any>>([])
const route = useRoute()
const page = ref<number>('page' in route.query ? Number(route.query.page) : 1)
const pages = ref<number>(0)

onMounted(async () => {
  await search()
})

const headers = ref<Array<string>>(['name', 'type', 'tag'])
const records = computed(() => {
  let result = <Array<object>>([])
  meals.value.forEach((meal :any) => {
    const type = convertMealType(meal.type)
    result.push({
      name: { value: meal.name, link: 'meals/' + meal.id },
      type: { value: type },
      tag: { value: meal.tag }
    })
  })
  return result
})

const options = computed(() => {
  return makeTagOptions(tags.value)
})
const tagColors = computed(() => {
  return makeTagColors(tags.value)
})

const search = async () => {
  buttonDisabled.value = true
  const { data } = await useFetch('/api/v1/meal', {
    params: {
      types: types.value.length === 0 ? [0, 1] : types.value,
      tags: selectedTags.value,
      isTagAnd: isTagAnd.value,
      name: name.value,
      page: page.value
    }
  })
  meals.value = data.value.meals
  pages.value = Math.ceil(data.value.count / PAGE_SIZE)
  buttonDisabled.value = false
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
    <form class="prose mb-5">
      <div class="flex mb-2">
        <div class="mr-4">
          <label for="type_in" class="label-text mr-2">家</label>
          <input id="type_in" v-model="types" value="0" type="checkbox" class="checkbox checkbox-secondary" />
        </div>
        <div>
          <label for="type_out" class="label-text mr-2">外</label>
          <input id="type_out" v-model="types" value="1" type="checkbox" class="checkbox checkbox-secondary" />
        </div>
      </div>
      <div class="flex items-center mb-2">
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
      <div class="flex mb-4">
        <input
          type="text"
          v-model="name"
          placeholder="名前"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <button @click="search" class="btn btn-lg btn-primary w-full" type="button" :disabled="buttonDisabled">
        検索
      </button>
    </form>
    <div class="divider"></div>
    <Table :headers="headers" :records="records" :tagColors="tagColors"/>
    <Pagination
      :pages="pages"
      :current="page"
      :url="route.path"
    />
  </div>
</template>
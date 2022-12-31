<script setup lang="ts">
  const isError = ref<Boolean>(false)
  const options = ref<Array<String>>(useFetch('/api/v1/tag_for_select').data._rawValue)
  const types = ref<Array<Number>>([0, 1])
  const from = ref<String>('')
  const to = ref<String>('')
  const selectedTags = ref<Array<Number>>([1, 2, 3])

  onMounted(() => {
    // set default Date
    var today = new Date()
    var oneWeekBefore = new Date()
    oneWeekBefore.setDate(oneWeekBefore.getDate() - 7)
    from.value = `${oneWeekBefore.getFullYear()}-${oneWeekBefore.getMonth()+1}-${oneWeekBefore.getDate()}`
    to.value = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
  })
  const submit = () => {
    const { data } = useFetch('/api/v1/tag', {
      method: 'post',
      body: { types: types.value, from: from.value, to: to.value, tags: selectedTags.value},
    })
  }
</script>
<template>
  <section class="prose">
    <form action="#" method="POST">
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
          <span v-if="isError" class="label-text-alt text-error">エラー</span>
        </label>
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
        <button @click="submit" class="btn btn-lg btn-primary w-full">ガチャガチャ</button>
      </div>
    </form>
  </section>
</template>
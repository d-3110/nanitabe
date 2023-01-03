<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
onMounted(() => {
  // TODO：クエリパラメータがない場合gachaへ
})
const saveHistroy = () => {
  // TODO: 保存
}
</script>
<template>
  <div class="flex flex-col justify-center items-center prose">
      <h3>結果</h3>
      <div>
        <h1>{{ $route.query.name }}</h1>
      </div>
      <button @click="saveHistroy" class="btn btn-lg btn-primary w-full mb-4">履歴保存</button>
      <button @click="$router.go(-1)" class="btn btn-lg btn-secondary w-full">もう一回！</button>
  </div>
</template>
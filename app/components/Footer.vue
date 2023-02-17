<template>
  <div class="btm-nav bg-neutral">
    <NuxtLink to="/gacha" class="text-primary" :class="$route.path == '/gacha' ? 'active' : ''">
      <font-awesome-icon class="text-primary block fa-lg" aria-hidden="true" :icon="['fa','bell-concierge']" />
      <span class="btm-nav-label">ガチャ</span>
    </NuxtLink>
    <NuxtLink to="/meals/add" class="bg-neutral text-primary" :class="$route.path == '/meals/add' ? 'active' : ''">
      <font-awesome-icon class="text-primary block fa-lg" aria-hidden="true" :icon="['fa','circle-plus']" />
      <span class="btm-nav-label">食事追加</span>
    </NuxtLink>
    <NuxtLink to="/meals" class="text-primary" :class="$route.path == '/meals' ? 'active' : ''">
      <font-awesome-icon class="text-primary block fa-lg" aria-hidden="true" :icon="['fa','utensils']" />
      <span class="btm-nav-label">食事一覧</span>
    </NuxtLink>
    <NuxtLink to="/histories" class="text-primary" :class="$route.path == '/histories' ? 'active' : ''">
      <font-awesome-icon class="text-primary block fa-lg" aria-hidden="true" :icon="['fa','clock-rotate-left']" />
      <span class="btm-nav-label">履歴一覧</span>
    </NuxtLink>
  </div>
</template>
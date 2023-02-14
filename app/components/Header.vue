<script setup lang="ts">
const openMenu = ref<Boolean>(true)
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const logout = async () => {
  const { error } = await auth.signOut()
  if (error) {
    console.log(error)
  }
  user.value = null
  return navigateTo('/')
}
const navigation = [
  { name: 'ガチャ', href: '/gacha' },
  { name: '食事追加', href: '/meals/add' },
  { name: '食事一覧', href: '/meals' },
  { name: '履歴一覧', href: '/histories' },
]
const handleLink = () => {
  openMenu.value = false
}
const toggleMenu = () => {
  if (!openMenu.value) {
    openMenu.value = true
  }
}
</script>
<template>
  <div class="navbar bg-neutral text-neutral-content rounded-full">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle" @click="toggleMenu">
          <font-awesome-icon class="text-primary block fa-lg" aria-hidden="true" icon="burger"/>
        </label>
        <ul v-show="openMenu" tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="item in navigation" :key="item.name" class="text-primary">
            <nuxt-link :to="item.href" @click="handleLink">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost normal-case text-xl text-primary">なにたべ</a>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle"  @click="logout">
        <div class="indicator">
          <font-awesome-icon class="text-primary block fa-lg" aria-hidden="true" icon="fa-right-from-bracket"/>
        </div>
      </button>
    </div>
  </div>
</template>
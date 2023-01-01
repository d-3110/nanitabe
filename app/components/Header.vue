<template>
  <div class="navbar bg-neutral text-neutral-content rounded-full">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <font-awesome-icon v-if="!open" class="text-primary block fa-lg" aria-hidden="true" :icon="['fa','burger']"/>
        </label>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li v-for="item in navigation" :key="item.name">
            <a :href="item.href">
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost normal-case text-xl text-primary">なにたべ</a>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <font-awesome-icon class="text-primary block fa-lg" aria-hidden="true" :icon="['fa','right-from-bracket']"/>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
const navigation = [
  { name: 'ホーム', href: '/' },
  { name: '食事追加', href: '/meals/add' },
]
</script>
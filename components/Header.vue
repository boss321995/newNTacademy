<template>
  <nav class="bg-yellow-50 shadow">
    <div class="container mx-auto flex items-center justify-between py-4 px-4">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <img :src="base + 'imgLogo/logo.png'" alt="NT Academy" class="h-10" />
        
      </div>
      <!-- Hamburger (Mobile) -->
      <button
        class="md:hidden text-2xl text-blue-900 focus:outline-none"
        @click="open = !open"
      >
        <span v-if="!open">&#9776;</span>
        <span v-else>&times;</span>
      </button>
      <!-- Menu -->
      <ul
        class="hidden md:flex space-x-6 text-blue-900 font-semibold"
      >
        <li>
          <NuxtLink to="/" class="hover:text-yellow-600" :class="{ 'text-yellow-600': $route.path === '/' }">หน้าแรก</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/service" class="hover:text-yellow-600" :class="{ 'text-yellow-600': $route.path.startsWith('/service') }">บริการของเรา</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/news" class="hover:text-yellow-600" :class="{ 'text-yellow-600': $route.path.startsWith('/news') }">ข่าวสาร</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="hover:text-yellow-600" :class="{ 'text-yellow-600': $route.path.startsWith('/contact') }">ติดต่อเรา</NuxtLink>
        </li>
      </ul>
    </div>
    <!-- Mobile Menu -->
    <ul
      v-if="open"
      class="md:hidden bg-white border-t px-4 pb-4 space-y-2 text-blue-900 font-semibold"
    >
      <li>
        <NuxtLink to="/" class="block py-2 hover:text-yellow-600" :class="{ 'text-yellow-600': $route.path === '/' }" @click="open = false">หน้าแรก</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/service" class="block py-2 hover:text-yellow-600" :class="{ 'text-yellow-600': $route.path.startsWith('/service') }" @click="open = false">บริการของเรา</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/news" class="block py-2 hover:text-yellow-600" :class="{ 'text-yellow-600': $route.path.startsWith('/news') }" @click="open = false">ข่าวสาร</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact" class="block py-2 hover:text-yellow-600" :class="{ 'text-yellow-600': $route.path.startsWith('/contact') }" @click="open = false">ติดต่อเรา</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
const base = useRuntimeConfig().app.baseURL || '/'
</script>
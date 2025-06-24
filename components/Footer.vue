<template>
  <footer class="bg-yellow-50 text-yellow-700 py-6 mt-16">
    <div class="container mx-auto px-4 text-center">
      <p>NT HRD TEAM 😎</p>
      <div v-if="visitorCount" class="text-xs text-gray-500 text-center mt-2">
        จำนวนผู้เข้าชม: {{ visitorCount }}
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visitorCount = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/.netlify/functions/visitor-counter')
    const data = await res.json()
    visitorCount.value = data.count
  } catch (e) {
    error.value = 'ไม่สามารถโหลดจำนวนผู้เข้าชมได้'
  }
})
</script>
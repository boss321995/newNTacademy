<template>
  <div>
    <Header />
    <div class="min-h-[60vh] flex flex-col items-center justify-center">
      <h1 class="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
        ยินดีต้อนรับสู่ NT Academy
      </h1>
      <p class="text-lg text-gray-700 mb-8 text-center max-w-xl">
        ศูนย์ฝึกอบรมและพัฒนาศักยภาพ บริการฝึกอบรม ห้องพัก สนามกีฬา และห้องจัดเลี้ยงครบวงจร
      </p>
      <NuxtLink
        to="/service"
        class="bg-yellow-400 text-blue-900 px-6 py-3 rounded font-semibold hover:bg-yellow-300 transition"
      >
        ดูบริการทั้งหมด
      </NuxtLink>
    </div>
    <!-- Banner Section -->
    <div class="relative w-full" style="padding-left:10%;padding-right:10%;">
      <div class="h-72 overflow-hidden rounded-xl shadow-lg relative">
        <transition-group name="fade" tag="div">
          <img
            v-for="(img, i) in banners"
            v-show="i === current"
            :key="img"
            :src="img"
            class="absolute inset-0 w-full h-full object-cover"
            alt="Banner"
          />
        </transition-group>
        <!-- ปุ่มเลื่อน -->
        <button
          @click="prevBanner"
          class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-yellow-400 text-blue-900 rounded-full p-2 shadow z-10"
        >
          ‹
        </button>
        <button
          @click="nextBanner"
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-yellow-400 text-blue-900 rounded-full p-2 shadow z-10"
        >
          ›
        </button>
        <!-- จุดบอกสถานะ -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          <span
            v-for="(img, i) in banners"
            :key="i"
            class="w-3 h-3 rounded-full cursor-pointer"
            :class="i === current ? 'bg-yellow-400' : 'bg-white opacity-50'"
            @click="goTo(i)"
          ></span>
        </div>
      </div>
    </div>
    <!-- Service Carousel -->
    <div class="w-full max-w-5xl mx-auto py-10">
      <h2 class="text-2xl font-bold text-blue-900 mb-6 text-center">บริการของเรา</h2>
      <div
        class="relative group"
        @mouseenter="pause = true"
        @mouseleave="pause = false"
      >
        <button
          @click="prevService"
          class="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
        >
          ‹
        </button>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          <!-- ส่วนของ card ในบริการของเรา -->
          <div
            v-for="(service, i) in visibleServices"
            :key="service.title"
            class="bg-white rounded shadow p-0 text-center flex flex-col h-full overflow-hidden"
          >
            <img
              :src="service.img"
              :alt="service.title"
              class="w-full h-40 object-cover"
            />
            <div class="p-6 flex-1 flex flex-col">
              <h3 class="font-semibold text-lg mb-1">{{ service.title }}</h3>
              <p class="text-gray-600">{{ service.desc }}</p>
            </div>
          </div>
        </div>
        <button
          @click="nextService"
          class="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10"
        >
          ›
        </button>
      </div>
    </div>
    <!-- Sport Calendar -->
    <SportCalendar />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const banners = [
  'assets/img/Gemini_Generated_Image_l0vpcgl0vpcgl0vp.png',
  'assets/img/Gemini_Generated_Image_2yi63a2yi63a2yi6.png',
  'assets/img/Gemini_Generated_Image_2yi63b2yi63b2yi6.png',
]
const current = ref(0)
let bannerTimer

function nextBanner() {
  current.value = (current.value + 1) % banners.length
}
function prevBanner() {
  current.value = (current.value - 1 + banners.length) % banners.length
}
function goTo(i) {
  current.value = i
}

onMounted(() => {
  bannerTimer = setInterval(nextBanner, 6000)
})
onUnmounted(() => clearInterval(bannerTimer))

const services = [
  {
    title: 'บริการจัดหลักสูตร',
    img: 'assets/img/LINE_ALBUM_กรมอุตุวิทยา_230705_50.jpg',
    desc: 'หลักสูตรด้านเทคโนโลยี: Power BI, Python, Data Analytics, Web Application, Cyber Security, Generative AI ฯลฯ หลักสูตรด้านการบริหาร: Digital Marketing, การสื่อสารที่มีประสิทธิภาพ, การบริหารจัดการ และหลักสูตรมากมายที่ช่วยพัฒนาทักษะบุคลากรของคุณ • ทีมวิทยากรมากประสบการณ์ พร้อมถ่ายทอดความรู้ที่นำไปประยุกต์ใช้ได้จริง • บริการให้คำปรึกษาและออกแบบหลักสูตรที่ตรงกับความต้องการขององค์กร เพื่อให้การฝึกอบรมเกิดประสิทธิภาพสูงสุด'
  },
  {
    title: 'อาคารสถานที่/ห้องอบรม/ห้องจัดเลี้ยง',
    img: 'assets/img/ห้องจัดเลี้ยง/DSC_0554 - Copy.JPG',
    desc: 'มีห้องจัดเลี้ยงสำหรับการจัดงานแต่งงาน หรืองานเลี้ยงสังสรรค์ในรูปแบบต่างๆ เชิญสัมผัสการให้บริการจัดเลี้ยงอาหารหลายรูปแบบสำหรับการประชุม อบรม สัมมนา งานเลี้ยงรับรอง งานเลี้ยงเปิดตัวสินค้าใหม่ งานสังสรรค์โอกาสต่างๆ งานแข่งขันกีฬา งานมงคลสมรส ในรูปแบบตามความต้องการของลูกค้า'
  },
  {
    title: 'โรงแรม/หอพัก',
    img: 'assets/img/โรงแรม/IMG_6853.JPG',
    desc: 'บริการหอพักสำหรับจัดอบรม / สัมมนาเป็นหมู่คณะด้วยบรรยากาศอันแสนสบาย เป็นส่วนตัวและการต้อนรับที่อบอุ่น สู่ห้องพักที่พรั่งพร้อมด้วยสิ่งอำนวยความสะดวกที่ทันสมัยกว่า 160 ห้อง เพิ่มความมั่นใจในความปลอดภัยด้วยอุปกรณ์ป้องกันอัคคีภัยที่เปี่ยมประสิทธิภาพ และระบบรักษาความปลอดภัยตลอด 24 ชั่วโมง'
  },
  {
    title: 'สนามกีฬาในร่ม/กลางแจ้ง',
    img: 'assets/img/Sport Club/_DSC8016.JPG',
    desc: 'เสริมสร้างสุขภาพที่ดีไปพร้อม ๆ กับผ่อนคลายความเหน็ดเหนื่อยจากการทำงาน เชิญเข้ามาสัมผัส Sport Club ที่สมบูรณ์แบบด้วยเครื่องออกกำลังกายที่ทันสมัยนานาชนิด โดยมีครูฝึกคอยให้คำแนะนำและดูแลท่านตลอดเวลา พร้อมห้องซาวน่า ห้องกีฬาอเนกประสงค์ สนามแบดมินตัน สนามฟุตบอล และอุปกรณ์กีฬาต่าง ๆ ที่เตรียมไว้คอยให้บริการ'
  },
  {
    title: 'บริการสื่อสิ่งพิมพ์',
    img: 'assets/img/print_media_service/295898.jpg',
    desc: 'งานบริการสิ่งพิมพ์ รับพิมพ์งาน นามบัตร, หนังสือ, วารสาร, แผ่นปลิว, แผ่นพับ, โปสเตอร์ และแบบพิมพ์เอกสารทั่วไป ด้วยเครื่องพิมพ์ระบบออฟเซท 4 สี และระบบดิจิตอล 4 สี ที่สวยงามและมีคุณภาพ'
  }
]
const start = ref(0)
const pause = ref(false)
const visibleServices = computed(() => services.slice(start.value, start.value + 3))

function nextService() {
  start.value = (start.value + 1) % (services.length - 2)
}
function prevService() {
  start.value = (start.value - 1 + (services.length - 2)) % (services.length - 2)
}

let serviceTimer
onMounted(() => {
  serviceTimer = setInterval(() => {
    if (!pause.value) nextService()
  }, 7500) // 7.5 วินาที
})
onUnmounted(() => clearInterval(serviceTimer))

// ถ้า pause เปลี่ยน ให้ reset timer (กันกรณีหยุดนาน)
watch(pause, (val) => {
  if (!val) {
    clearInterval(serviceTimer)
    serviceTimer = setInterval(() => {
      if (!pause.value) nextService()
    }, 7500)
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
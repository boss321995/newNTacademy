<template>
  <div>
    <Header />
    <div class="max-w-6xl mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold text-blue-900 mb-8 text-center">ข่าวประชาสัมพันธ์</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="news in newsList"
          :key="news.title"
          class="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          <img :src="baseUrl + news.img" :alt="news.title" class="w-full h-48 object-cover" />
          <div class="p-6 flex-1 flex flex-col justify-between">
            <h2 class="font-semibold text-xl mb-2">{{ news.title }}</h2>
            <p class="text-gray-600 mb-4" v-html="news.summary"></p>
            <div class="text-sm text-gray-400 mt-auto">{{ news.date }}</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
const baseUrl = useRuntimeConfig().app.baseURL || '/'
const newsList = [
  {
    title: 'NT Academy: หลักสูตรอบรมใหม่เพื่อบุคลากร NT',
    img: 'img/Gemini_Generated_Image_jjeoa5jjeoa5jjeo.png',
    summary: 'NT Academy เปิดรับสมัครหลักสูตรอบรมใหม่ล่าสุด! ออกแบบเฉพาะสำหรับบุคลากรองค์กร เสริมทักษะและความรู้ให้ทันสมัย ครอบคลุมทุกความต้องการในการพัฒนาศักยภาพ สมัครง่ายๆ ผ่านระบบออนไลน์ที่ <a href="https://hrd.ntplc.co.th" target="_blank" class="text-blue-600 underline">hrd.ntplc.co.th</a> โอกาสดีสำหรับองค์กรที่ต้องการยกระดับทีมงานของคุณ สมัครได้แล้ววันนี้!',
    date: '18 มิ.ย. 2568'
  },
  {
    title: 'NT Academy ภูมิใจเสนอ: ผลงาน AI "HRD AI Assistance" โดยทีม Work wise - ชนะเลิศ AI*dea 2025!',
    img: 'img/239342.jpg',
    summary: 'NT Academy ภูมิใจเสนอ: ผลงาน AI "HRD AI Assistance" โดยทีม Work wise - ชนะเลิศ AI*dea 2025! NT Academy ขอแสดงความยินดีกับ ทีม Work wise เจ้าของผลงาน HRD AI Assistance ที่คว้ารางวัลชนะเลิศในการประกวด AI*dea 2025! ผลงานนวัตกรรมชิ้นนี้สะท้อนถึงศักยภาพของบุคลากรในการนำ AI มาเพิ่มประสิทธิภาพการเรียนรู้และพัฒนาบุคลากรในรูปแบบ Personalized Learning ได้อย่างยอดเยี่ยม <span class="font-bold text-yellow-600">HRD AI Assistance คือก้าวสำคัญในการยกระดับกระบวนการ HRD ให้ตอบโจทย์ยุคดิจิทัลได้อย่างแท้จริง!</span>',
    date: '10 มิ.ย. 2568'
  },
  {
    title: 'ห้องพักราคาพิเศษสำหรับพนักงานและหอพักสุดคุ้ม!',
    img: 'img/โรงแรม/DSC07827.JPG',
    summary: 'ประชาสัมพันธ์โรงแรมและหอพัก! โรงแรมราคาพิเศษเพียง 850 บาท/คืน สำหรับสิทธิพนักงานเหลือเพียง 650 บาท/คืน และหอพักราคาสุดคุ้ม 550 บาท/คืน สนใจสอบถามรายละเอียดเพิ่มเติมได้ที่ฝ่ายประชาสัมพันธ์ โทร 02-596-1606, 02-596-1609 (โรงแรม-หอพัก)',
    date: '5 มิ.ย. 2568'
  }
]
</script>
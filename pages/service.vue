<template>
  <div>
    <Header />
    <div class="max-w-6xl mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold text-yellow-400 mb-8 text-center">บริการของสถาบัน</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.title"
          class="bg-white rounded shadow p-0 text-center flex flex-col h-full overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <img :src="service.img" :alt="service.title" class="w-full h-40 object-cover" />
          <div class="p-6 flex flex-col flex-1">
            <h3 class="font-semibold text-lg mb-1">{{ service.title }}</h3>
            <p class="text-gray-600 flex-1">{{ service.desc }}</p>
            <button
              class="mt-auto bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
              @click="selectService(service)"
            >
              ดูรายละเอียด
            </button>
          </div>
        </div>
      </div>

      <!-- Gallery Modal -->
      <div v-if="selected" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div
          class="bg-white rounded-lg max-w-4xl w-full p-6 relative"
          style="transform: scale(1.3);"
        >
          <button @click="selected = null" class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl">&times;</button>
          <h2 class="text-2xl font-bold mb-4 text-blue-900">{{ selected.title }} - แกลลอรี่</h2>
          <div class="flex overflow-x-auto gap-4 mb-6 pb-2">
            <img
              v-for="(img, i) in selected.gallery"
              :key="i"
              :src="img"
              class="h-40 w-auto object-cover rounded cursor-pointer hover:scale-105 transition"
              :alt="selected.title + ' ' + (i+1)"
              @click="openImage(img)"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2 text-blue-800">Info-graphic โฆษณาบริการ</h3>
            <div class="flex flex-wrap gap-4 mb-4">
              <img
                v-for="(info, i) in selected.infographic"
                :key="i"
                :src="info.startsWith('/') ? base + info.substring(1) : base + info"
                class="max-w-xs max-h-60 object-contain rounded border bg-gray-50"
                :alt="'infographic ' + (i+1)"
                @click="openImage(info.startsWith('/') ? base + info.substring(1) : base + info)"
              />
              <div v-if="!selected.infographic.length" class="text-gray-400">ยังไม่มี info-graphic</div>
            </div>
            <div class="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded shadow text-blue-900 text-base md:text-lg font-medium flex items-center gap-3">
              <svg class="w-7 h-7 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/></svg>
              <span>
                {{ getServiceNotice(selected.title) }}
              </span>
            </div>
          </div>
        </div>
        <button @click="selected = null" class="absolute top-4 right-8 text-white text-4xl font-bold">&times;</button>
      </div>

      <!-- Lightbox Modal -->
      <div v-if="lightbox" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100]">
        <img
          :src="lightbox"
          class="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white transition-transform duration-300"
        />
        <button @click="lightbox = null" class="absolute top-4 right-8 text-white text-4xl font-bold">&times;</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = [
  {
    title: 'บริการจัดหลักสูตร',
    img: '/assets/img/training/LINE_ALBUM_กรมอุตุวิทยา_230705_50.jpg',
    desc: 'ยกระดับศักยภาพบุคลากรของคุณด้วยหลักสูตรอบรมด้าน เทคโนโลยี (Power BI, Python, Data Analytics, Generative AI, Cyber Security ฯลฯ) และ การบริหาร (Digital Marketing, การสื่อสาร ฯลฯ) โดยทีมวิทยากรผู้เชี่ยวชาญ พร้อมออกแบบหลักสูตรที่ตอบโจทย์ธุรกิจคุณโดยเฉพาะ!',
    gallery: [
     
      '/assets/img/training/LINE_ALBUM_กรมอุตุวิทยา_230705_50.jpg',
      '/assets/img/training/LINE_ALBUM_กรมอุตุวิทยา_230705_114.jpg',
      '/assets/img/training/NT2_0808.JPG',
      '/assets/img/training/NT2_1505.JPG',
      '/assets/img/training/TOT_4118.JPG',
      '/assets/img/training/TOT_4122.JPG'
    ],
    infographic: [
      '/assets/img/training/S__7634960.jpg'
    ]
  },
  {
    title: 'อาคารสถานที่/ห้องอบรม/ห้องจัดเลี้ยง',
    img: '/assets/img/ห้องจัดเลี้ยง/DSC_0078.JPG',
    desc: 'มีห้องจัดเลี้ยงสำหรับการจัดงานแต่งงาน หรืองานเลี้ยงสังสรรค์ในรูปแบบต่างๆ เชิญ สัมผัสการให้บริการจัดเลี้ยงอาหารหลายรูปแบบสำหรับการประชุม อบรม สัมมนา งานเลี้ยงรับรอง งานเลี้ยงเปิดตัวสินค้าใหม่ งานสังสรรค์โอกาสต่างๆ งานแข่งขันกีฬา งานมงคลสมรส ในรูปแบบตามความต้องการของลูกค้า',
    gallery: [
      '/assets/img/ห้องจัดเลี้ยง/DSC_0078.JPG',
      '/assets/img/ห้องจัดเลี้ยง/DSC_0079.JPG',
      '/assets/img/ห้องจัดเลี้ยง/DSC_0081.JPG',
      '/assets/img/ห้องจัดเลี้ยง/DSC_0141.JPG',
      '/assets/img/ห้องจัดเลี้ยง/NT2_5486.jpg',
      '/assets/img/ห้องจัดเลี้ยง/NT2_5492.jpg',
      '/assets/img/ห้องจัดเลี้ยง/NT2_5501.jpg',
      '/assets/img/ห้องจัดเลี้ยง/NT2_5504.jpg',
      '/assets/img/ห้องจัดเลี้ยง/NT2_5510.jpg',
      '/assets/img/ห้องจัดเลี้ยง/NT2_5513.jpg'
    ],
    infographic: []
  },
  {
    title: 'โรงแรม/หอพัก',
    img: '/assets/img/โรงแรม/DSC07827.JPG',
    desc: 'บริการหอพักสำหรับจัดอบรม / สัมมนาเป็นหมู่คณะด้วยบรรยากาศอันแสนสบาย เป็นส่วนตัวและการต้อนรับที่อบอุ่น สู่ห้องพักที่พรั่งพร้อมด้วยสิ่งอำนวยความสะดวกที่ทันสมัยกว่า 160 ห้อง เพิ่มความมั่นใจในความปลอดภัยด้วยอุปกรณ์ป้องกันอัคคีภัยที่เปี่ยมประสิทธิภาพ และระบบรักษาความปลอดภัยตลอด 24 ชั่วโมง',
    gallery: [
      
      '/assets/img/โรงแรม/DSC07827.JPG',
      '/assets/img/โรงแรม/DSC07830.JPG',
      '/assets/img/โรงแรม/IMG_6853.JPG',
      '/assets/img/โรงแรม/DSC07834.JPG',
      '/assets/img/โรงแรม/NT2_5310.jpg',
      '/assets/img/โรงแรม/NT2_5316.jpg',
      '/assets/img/โรงแรม/NT2_5326.jpg',
      '/assets/img/โรงแรม/NT2_5341.jpg',
      '/assets/img/โรงแรม/NT2_5342.jpg',
      '/assets/img/โรงแรม/NT2_5346.jpg',
      '/assets/img/โรงแรม/NT2_5359.jpg',
      '/assets/img/โรงแรม/NT2_5364.jpg',
      '/assets/img/โรงแรม/NT2_5374.jpg',
      '/assets/img/โรงแรม/NT2_5376.jpg',
      '/assets/img/โรงแรม/NT2_5423.jpg',
      '/assets/img/โรงแรม/NT2_5426.jpg'
    ],
    infographic: [
        'assets/img/โรงแรม/346094.jpg'
    ]
  },
  {
    title: 'สนามกีฬาในร่ม/กลางแจ้ง',
    img: '/assets/img/Sport Club/DJI_0063.JPG',
    desc: 'เสริมสร้าง สุขภาพที่ดีไปพร้อม ๆ กับผ่อนคลายความเหน็ดเหนื่อยจากการทำงาน เชิญเข้ามาสัมผัส Sport Club ที่สมบูรณ์แบบด้วยเครื่องออกกำลังกายที่ทันสมัยนานาชนิด โดยมีครูฝึกคอย ให้คำแนะนำและดูแลท่านตลอดเวลา พร้อมห้องซาวน่า ห้องกีฬาอเนกประสงค์ สนามแบดมินตัน สนามฟุตบอล และอุปกรณ์กีฬาต่าง ๆ ที่เตรียมไว้คอยให้บริการ',
    gallery: [
      '/assets/img/Sport Club/DJI_0063.JPG',
      '/assets/img/Sport Club/DJI_0070.JPG',
      '/assets/img/Sport Club/DJI_0079.JPG',
      '/assets/img/Sport Club/DSC_2366.jpg',
      '/assets/img/Sport Club/NT2_5434.jpg',
      '/assets/img/Sport Club/NT2_5437.jpg',
      '/assets/img/Sport Club/NT2_5453.jpg',
      '/assets/img/Sport Club/NT2_5456.jpg',
      '/assets/img/Sport Club/NT2_5460.jpg'
    ],
    infographic: []
  },
  {
    title: 'บริการสื่อสิ่งพิมพ์',
    img: '/assets/img/print_media_service/295898.jpg',
    desc: 'งานบริการสิ่งพิมพ์ รับพิมพ์งาน นามบัตร, หนังสือ, วารสาร, แผ่นปลิว, แผ่นพับ, โปสเตอร์ และแบบพิมพ์เอกสารทั่วไป ด้วยเครื่องพิมพ์ระบบออฟเซท 4 สี และระบบดิจิตอล 4 สี ที่สวยงามและมีคุณภาพ',
    gallery: [
      '/assets/img/print_media_service/295898.jpg',
      '/assets/img/print_media_service/295899.jpg',
      '/assets/img/print_media_service/295895.jpg',
      '/assets/img/print_media_service/52822.jpg',
      '/assets/img/print_media_service/52820.jpg'
    ],
    infographic: []
  }
]

const selected = ref(null)
const lightbox = ref(null)
function selectService(service) {
  selected.value = service
}
function openImage(url) {
  lightbox.value = url
}

function getServiceNotice(title) {
  switch (title) {
    case 'บริการจัดหลักสูตร':
      return `สอบถามรายละเอียดหลักสูตรและบริการเพิ่มเติม โทร 02-596-1377 (คุณสุ) หรือ 02-596-1255 (คุณเบิร์ท)`;
    case 'อาคารสถานที่/ห้องอบรม/ห้องจัดเลี้ยง':
      return `สำรองห้องอบรม ห้องประชุม หรือจัดเลี้ยง  02-596-1336 (ห้องอบรม,ประชุม - สัมนา ,ห้องจัดเลี้ยง )
02-596-1606, 02-596-1609 (โรงแรม-หอพัก)`;
    case 'โรงแรม/หอพัก':
      return `จองห้องพักหรือสอบถามข้อมูลหอพัก โทร 02-596-1606, 02-596-1609 (โรงแรม-หอพัก)`;
    case 'บริการสื่อสิ่งพิมพ์':
      return `สถาบันวิชาการ NT เปิดให้บริการงานบริการสิ่งพิมพ์ รับพิมพ์งาน นามบัตร, หนังสือ, วารสาร, แผ่นปลิว, แผ่นพับ, โปสเตอร์ และแบบพิมพ์ เอกสารทั่วไป ด้วยเครื่องพิมพ์ระบบออฟเซท 4 สี และ ระบบดิจิตอล 4 สี สนใจขอทราบข้อมูลรายละเอียดติดต่อประสานงานพิมพ์ได้ที่ (02-591-8042)`;
    default:
      return `สถาบันวิชาการ NT เปิดให้บริการสิ่งอำนวยความสะดวกต่างๆ สนใจขอทราบข้อมูลรายละเอียดได้ที่ 02-596-1337 (คุณกอล์ฟ) หรือ 02-596-1110 (คุณหวาน)`;
  }
}

const base = useRuntimeConfig().app.baseURL || '/'
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
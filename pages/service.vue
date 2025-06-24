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
          <div class="w-full h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
            <img 
              :src="getImageUrl(service.img)" 
              :alt="service.title" 
              class="w-full h-full object-cover transition-opacity duration-300"
              @error="handleServiceImageError"
              @load="handleServiceImageLoad"
            />
          </div>
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
      <div v-if="selected" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div
          class="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto relative"
        >
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
            <h2 class="text-2xl font-bold text-blue-900">{{ selected.title }} - แกลลอรี่</h2>
            <button @click="selected = null" class="text-gray-500 hover:text-red-500 text-2xl font-bold">&times;</button>
          </div>
          
          <!-- Notice Section (top) -->
          <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm mb-6">
            <div class="flex items-start gap-4">
              <svg class="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/>
              </svg>
              <div>
                <h4 class="font-semibold text-blue-900 mb-2">ข้อมูลการติดต่อ</h4>
                <p class="text-blue-800 leading-relaxed">
                  {{ getServiceNotice(selected.title) }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <!-- Gallery Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4 text-blue-800 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                ภาพกิจกรรม ({{ selected.gallery.length }} ภาพ)
              </h3>
              
              <!-- Gallery Grid View -->
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                <div
                  v-for="(img, i) in (showAllGallery ? selected.gallery : selected.gallery.slice(0, 10))"
                  :key="i"
                  class="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 bg-gray-50"
                  @click="openImage(getImageUrl(img))"
                >
                  <!-- Loading state -->
                  <div 
                    v-if="galleryImageLoading[`gallery-${i}`]" 
                    class="absolute inset-0 bg-gray-100 flex items-center justify-center"
                  >
                    <svg class="w-6 h-6 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  
                  <img
                    :src="getImageUrl(img)"
                    :class="[
                      'w-full h-full object-cover group-hover:scale-110 transition-all duration-300',
                      imageErrors[`gallery-${i}`] ? 'opacity-0' : '',
                      galleryImageLoading[`gallery-${i}`] ? 'opacity-0' : 'opacity-100'
                    ]"
                    :alt="`${selected.title} ภาพที่ ${i+1}`"
                    @error="handleImageError($event, img, i)"
                    @load="handleImageLoad($event, i)"
                  />
                  
                  <!-- Error placeholder -->
                  <div 
                    v-if="imageErrors[`gallery-${i}`]" 
                    class="absolute inset-0 bg-red-50 flex items-center justify-center border-2 border-red-200 rounded-lg"
                  >
                    <div class="text-center text-red-500">
                      <svg class="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-xs">ไม่พบรูป</span>
                    </div>
                  </div>
                  
                  <!-- Hover overlay -->
                  <div
                    class="absolute inset-0 bg-transparent transition-all duration-300 flex items-center justify-center"
                    v-if="!imageErrors[`gallery-${i}`] && !galleryImageLoading[`gallery-${i}`]"
                  >
                    <div class="bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Image counter -->
                  <div 
                    v-if="!imageErrors[`gallery-${i}`] && !galleryImageLoading[`gallery-${i}`]"
                    class="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded"
                  >
                    {{ i + 1 }}
                  </div>
                </div>
              </div>
              
              <!-- Show More/Less Toggle -->
              <div v-if="selected.gallery.length > 10" class="text-center">
                <button
                  @click="showAllGallery = !showAllGallery"
                  class="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 mx-auto"
                >
                  <span v-if="!showAllGallery">ดูภาพทั้งหมด ({{ selected.gallery.length }})</span>
                  <span v-else>ซ่อนภาพบางส่วน</span>
                  <svg class="w-4 h-4" :class="{ 'rotate-180': showAllGallery }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Infographic Section -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-4 text-blue-800">Info-graphic โฆษณาบริการ</h3>
              <div v-if="selected.infographic.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                <div
                  v-for="(info, i) in selected.infographic"
                  :key="i"
                  class="group cursor-pointer"
                  @click="openInfographic(info)"
                >
                  <div class="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg bg-white">
                    <template v-if="isPdf(info)">
                      <div class="flex flex-col items-center justify-center h-48 bg-gradient-to-br from-red-50 to-red-100 relative">
                        <template v-if="pdfLoading && pdfLoading[i]">
                          <div class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
                            <div class="text-center">
                              <svg class="w-10 h-10 text-red-500 animate-spin mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span class="text-xs text-red-600">กำลังโหลด PDF...</span>
                            </div>
                          </div>
                        </template>
                        <template v-else-if="pdfThumbnails && pdfThumbnails[i]">
                          <img 
                            :src="pdfThumbnails[i]" 
                            class="w-full h-48 object-contain bg-white rounded border shadow-sm" 
                            :alt="`PDF thumbnail ${i+1}`"
                            style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;"
                          />
                        </template>
                        <template v-else>
                          <div class="text-center">
                            <svg class="w-16 h-16 text-red-500 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                            </svg>
                            <span class="text-sm text-red-700 font-medium">ไฟล์ PDF</span>
                            <br>
                            <span class="text-xs text-red-500">คลิกเพื่อดู</span>
                          </div>
                        </template>
                      </div>
                    </template>
                    <template v-else>
                      <div class="relative h-48 bg-gray-50 overflow-hidden">
                        <!-- Loading state for infographic images -->
                        <div 
                          v-if="infographicImageLoading && infographicImageLoading[`info-${i}`]" 
                          class="absolute inset-0 bg-gray-100 flex items-center justify-center"
                        >
                          <svg class="w-8 h-8 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                        
                        <img
                          :src="getImageUrl(info)"
                          :class="[
                            'w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300',
                            infographicImageLoading && infographicImageLoading[`info-${i}`] ? 'opacity-0' : 'opacity-100'
                          ]"
                          :alt="`infographic ${i+1}`"
                          @load="handleInfographicImageLoad($event, i)"
                          @error="handleInfographicImageError($event, i)"
                          :style="isGif(info) ? 'object-fit: contain;' : ''"
                        />
                      </div>
                    </template>
                    
                    <!-- Hover overlay -->
                    <div class="absolute inset-0 bg-transparent transition-all duration-300 flex items-center justify-center"
                      v-if="!(infographicImageLoading && infographicImageLoading[`info-${i}`])"
                    >
                      <div class="bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p class="text-center text-sm text-gray-600 mt-2">{{ isPdf(info) ? getPdfLabel(info) : `หลักสูตรที่ ${i+1}` }}</p>
                </div>
              </div>
              <div v-else class="text-center text-gray-400 py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                ยังไม่มี info-graphic
              </div>
            </div>

            <!-- Notice Section (bottom) -->
            <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-6 rounded-lg shadow-sm">
              <div class="flex items-start gap-4">
                <svg class="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/>
                </svg>
                <div>
                  <h4 class="font-semibold text-blue-900 mb-2">ข้อมูลการติดต่อ</h4>
                  <p class="text-blue-800 leading-relaxed">
                    {{ getServiceNotice(selected.title) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Improved Lightbox Modal -->
      <div v-if="lightbox" class="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[100]" @click="closeLightbox">
        <div class="relative w-full h-full flex items-center justify-center p-4">
          <button 
            @click="closeLightbox" 
            class="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-300"
          >
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <div class="max-w-full max-h-full flex items-center justify-center" @click.stop>
            <div class="absolute top-2 left-2 bg-white bg-opacity-80 text-xs text-red-600 px-2 py-1 rounded shadow z-20">
              {{ lightboxType }}: {{ lightbox }}
            </div>
            <template v-if="lightboxType === 'pdf'">
              <iframe 
                :src="lightbox" 
                class="w-[90vw] h-[90vh] bg-white rounded-lg shadow-2xl border-4 border-red-500" 
                frameborder="0" 
                @error="onIframeError"
                @load="onIframeLoad"
              ></iframe>
            </template>
            <template v-else-if="lightboxType === 'pdf-error'">
              <div class="flex flex-col items-center justify-center w-[90vw] h-[90vh] bg-white rounded-lg shadow-2xl">
                <svg class="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                <div class="text-lg text-red-600 font-bold">ไม่สามารถแสดง PDF ได้</div>
                <div class="text-gray-500 mt-2">ตรวจสอบ path หรือความถูกต้องของไฟล์ PDF</div>
                <a :href="lightbox" target="_blank" class="mt-4 text-blue-600 underline">ลองเปิด PDF ในแท็บใหม่</a>
              </div>
            </template>
            <template v-else>
              <!-- Loading for lightbox image -->
              <div v-if="!lightboxImageLoaded" class="absolute inset-0 flex items-center justify-center">
                <div class="bg-black bg-opacity-50 rounded-lg p-4">
                  <svg class="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
              
              <img
                :src="lightbox"
                :class="[
                  'max-w-full max-h-full object-contain rounded-lg shadow-2xl border-4 border-red-500 transition-opacity duration-300',
                  lightboxImageLoaded ? 'opacity-100' : 'opacity-0'
                ]"
                :alt="'lightbox image: ' + lightbox"
                @load="onLightboxImageLoad"
                @error="onLightboxImageError"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { renderPdfThumbnail } from '~/utils/pdfThumbnail.js'

const services = [
  {
    title: 'บริการจัดหลักสูตร',
    img: '/img/training/LINE_ALBUM_กรมอุตุวิทยา_230705_50.jpg',
    desc: 'ยกระดับศักยภาพบุคลากรของคุณด้วยหลักสูตรอบรมด้าน เทคโนโลยี (Power BI, Python, Data Analytics, Generative AI, Cyber Security ฯลฯ) และ การบริหาร (Digital Marketing, การสื่อสาร ฯลฯ) โดยทีมวิทยากรผู้เชี่ยวชาญ พร้อมออกแบบหลักสูตรที่ตอบโจทย์ธุรกิจคุณโดยเฉพาะ!',
    gallery: [
      '/img/training/LINE_ALBUM_กรมอุตุวิทยา_230705_50.jpg',
      '/img/training/LINE_ALBUM_กรมอุตุวิทยา_230705_114.jpg',
      '/img/training/NT2_0808.JPG',
      '/img/training/NT2_1505.JPG',
      '/img/training/TOT_4118.JPG',
      '/img/training/TOT_4122.JPG'
    ],
    infographic: [
      '/infoServiceTraining/โครงร่างหลักสูตร_Build AI Applications using LLMs from Theory to Practice.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Cloud Computing.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Data Analytics with No Code using Azure Machine Learning.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Data Quality Assessment and Information .pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Fine tuning LLM and Agentic AI using MCP Server and Claude.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Quantum Technologies and Cyber Security in the post Quantum Era.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Security and Privacy by Design - Foundation.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Security and Privacy by Design - Implementation.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Source Code-Build-Deploy Web App ด้วย GitHub.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_Web Application Security Essentials.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_การใช้งาน Python ทางด้าน Data Analytics.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_การติดตั้งบริการ FTTx และการตรวจแก้บริการระดับประยุกต์.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_การออกแบบ UX-UI.pdf',
      '/infoServiceTraining/โครงร่างหลักสูตร_เครื่องมือดิจิทัลเพื่อการบริหารโครงการ.pdf'
    ]
  },
  {
    title: 'อาคารสถานที่/ห้องอบรม/ห้องจัดเลี้ยง',
    img: '/img/ห้องจัดเลี้ยง/DSC_0078.JPG',
    desc: 'มีห้องจัดเลี้ยงสำหรับการจัดงานแต่งงาน หรืองานเลี้ยงสังสรรค์ในรูปแบบต่างๆ เชิญ สัมผัสการให้บริการจัดเลี้ยงอาหารหลายรูปแบบสำหรับการประชุม อบรม สัมมนา งานเลี้ยงรับรอง งานเลี้ยงเปิดตัวสินค้าใหม่ งานสังสรรค์โอกาสต่างๆ งานแข่งขันกีฬา งานมงคลสมรส ในรูปแบบตามความต้องการของลูกค้า',
    gallery: [
      '/img/ห้องจัดเลี้ยง/DSC_0078.JPG',
      '/img/ห้องจัดเลี้ยง/DSC_0079.JPG',
      '/img/ห้องจัดเลี้ยง/DSC_0081.JPG',
      '/img/ห้องจัดเลี้ยง/DSC_0141.JPG',
      '/img/ห้องจัดเลี้ยง/NT2_5486.jpg',
      '/img/ห้องจัดเลี้ยง/NT2_5492.jpg',
      '/img/ห้องจัดเลี้ยง/NT2_5501.jpg',
      '/img/ห้องจัดเลี้ยง/NT2_5504.jpg',
      '/img/ห้องจัดเลี้ยง/NT2_5510.jpg',
      '/img/ห้องจัดเลี้ยง/NT2_5513.jpg'
    ],
    infographic: []
  },
  {
    title: 'โรงแรม/หอพัก',
    img: '/img/โรงแรม/DSC07827.JPG',
    desc: 'บริการหอพักสำหรับจัดอบรม / สัมมนาเป็นหมู่คณะด้วยบรรยากาศอันแสนสบาย เป็นส่วนตัวและการต้อนรับที่อบอุ่น สู่ห้องพักที่พรั่งพร้อมด้วยสิ่งอำนวยความสะดวกที่ทันสมัยกว่า 160 ห้อง เพิ่มความมั่นใจในความปลอดภัยด้วยอุปกรณ์ป้องกันอัคคีภัยที่เปี่ยมประสิทธิภาพ และระบบรักษาความปลอดภัยตลอด 24 ชั่วโมง',
    gallery: [
      '/img/โรงแรม/DSC07827.JPG',
      '/img/โรงแรม/DSC07830.JPG',
      '/img/โรงแรม/IMG_6853.JPG',
      '/img/โรงแรม/DSC07834.JPG',
      '/img/โรงแรม/NT2_5310.jpg',
      '/img/โรงแรม/NT2_5316.jpg',
      '/img/โรงแรม/NT2_5326.jpg',
      '/img/โรงแรม/NT2_5341.jpg',
      '/img/โรงแรม/NT2_5342.jpg',
      '/img/โรงแรม/NT2_5346.jpg',
      '/img/โรงแรม/NT2_5359.jpg',
      '/img/โรงแรม/NT2_5364.jpg',
      '/img/โรงแรม/NT2_5374.jpg',
      '/img/โรงแรม/NT2_5376.jpg',
      '/img/โรงแรม/NT2_5423.jpg',
      '/img/โรงแรม/NT2_5426.jpg'
    ],
    infographic: [
        '/img/โรงแรม/346094.jpg'
    ]
  },
  {
    title: 'สนามกีฬาในร่ม/กลางแจ้ง',
    img: '/img/Sport Club/DJI_0063.JPG',
    desc: 'เสริมสร้าง สุขภาพที่ดีไปพร้อม ๆ กับผ่อนคลายความเหน็ดเหนื่อยจากการทำงาน เชิญเข้ามาสัมผัส Sport Club ที่สมบูรณ์แบบด้วยเครื่องออกกำลังกายที่ทันสมัยนานาชนิด โดยมีครูฝึกคอย ให้คำแนะนำและดูแลท่านตลอดเวลา พร้อมห้องซาวน่า ห้องกีฬาอเนกประสงค์ สนามแบดมินตัน สนามฟุตบอล และอุปกรณ์กีฬาต่าง ๆ ที่เตรียมไว้คอยให้บริการ',
    gallery: [
      '/img/Sport Club/DJI_0063.JPG',
      '/img/Sport Club/DJI_0070.JPG',
      '/img/Sport Club/DJI_0079.JPG',
      '/img/Sport Club/DSC_2366.jpg',
      '/img/Sport Club/NT2_5434.jpg',
      '/img/Sport Club/NT2_5437.jpg',
      '/img/Sport Club/NT2_5453.jpg',
      '/img/Sport Club/NT2_5456.jpg',
      '/img/Sport Club/NT2_5460.jpg'
    ],
    infographic: []
  },
  {
    title: 'บริการสื่อสิ่งพิมพ์',
    img: '/img/print_media_service/295898.jpg',
    desc: 'งานบริการสิ่งพิมพ์ รับพิมพ์งาน นามบัตร, หนังสือ, วารสาร, แผ่นปลิว, แผ่นพับ, โปสเตอร์ และแบบพิมพ์เอกสารทั่วไป ด้วยเครื่องพิมพ์ระบบออฟเซท 4 สี และระบบดิจิตอล 4 สี ที่สวยงามและมีคุณภาพ',
    gallery: [
      '/img/print_media_service/295898.jpg',
      '/img/print_media_service/295899.jpg',
      '/img/print_media_service/295895.jpg',
      '/img/print_media_service/52822.jpg',
      '/img/print_media_service/52820.jpg'
    ],
    infographic: []
  }
]

const selected = ref(null)
const lightbox = ref(null)
const lightboxImageLoaded = ref(false)
const showAllGallery = ref(false)
const imageErrors = ref({})
const lightboxType = ref('image')
const galleryImageLoading = ref({})
const infographicImageLoading = ref({}) // <-- Added missing declaration here

// --- PDF Thumbnail State ---
const pdfThumbnails = ref({})
const pdfLoading = ref({})
const pdfError = ref({})

// Watch for selected service change to trigger thumbnail loading
watch(selected, async (newService) => {
  if (!newService) return
  // Reset states
  pdfThumbnails.value = {}
  pdfLoading.value = {}
  pdfError.value = {}
  // For each PDF in infographic, generate thumbnail
  for (const [i, info] of newService.infographic.entries()) {
    if (isPdf(info)) {
      pdfLoading.value[i] = true
      try {
        const url = getImageUrl(info)
        console.log('PDF thumbnail url:', url)
        const thumb = await renderPdfThumbnail(url, 200)
        if (thumb) {
          pdfThumbnails.value[i] = thumb
        } else {
          pdfError.value[i] = true
          console.warn('No thumbnail generated for', url)
        }
      } catch (e) {
        pdfError.value[i] = true
        console.error('PDF thumbnail error:', e)
      } finally {
        pdfLoading.value[i] = false
      }
    }
  }
}, { immediate: true })

function selectService(service) {
  selected.value = service
  // Reset image states when opening new service
  imageErrors.value = {}
  galleryImageLoading.value = {}
  // Set loading true for all gallery images
  if (service.gallery && Array.isArray(service.gallery)) {
    service.gallery.forEach((img, i) => {
      galleryImageLoading.value[`gallery-${i}`] = true
    })
  }
}

function openImage(url) {
  // console.log('openImage url:', url)
  lightbox.value = url
  lightboxImageLoaded.value = false
}

function onLightboxImageLoad(e) {
  // console.log('onLightboxImageLoad', e)
  lightboxImageLoaded.value = true
}

function getImageUrl(imagePath) {
  const base = useRuntimeConfig().app.baseURL || '/'
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  // รองรับ baseURL เสมอ
  if (imagePath.startsWith('/img/') || imagePath.startsWith('/infoServiceTraining/')) {
    return base.replace(/\/$/, '') + imagePath
  }
  if (imagePath.startsWith('/')) {
    return base + imagePath.substring(1)
  }
  return base + imagePath
}

function handleImageLoad(event, i) {
  galleryImageLoading.value[`gallery-${i}`] = false
}

function handleImageError(event, imagePath, i) {
  galleryImageLoading.value[`gallery-${i}`] = false
  imageErrors.value[`gallery-${i}`] = true
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

function isPdf(path) {
  return path.toLowerCase().endsWith('.pdf')
}

// --- Utility function for GIF check ---
function isGif(path) {
  return path.toLowerCase().endsWith('.gif')
}

// --- Utility function for image type check ---
function isImage(path) {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(path)
}

function openInfographic(info) {
  if (isPdf(info)) {
    // PDF preview
    const url = getImageUrl(info)
    // console.log('openInfographic PDF url:', url)
    lightbox.value = url
    lightboxType.value = 'pdf'
    lightboxImageLoaded.value = true // no loading for PDF
  } else if (isImage(info)) {
    openImage(getImageUrl(info))
    lightboxType.value = 'image'
  } else {
    // fallback: treat as image
    openImage(getImageUrl(info))
    lightboxType.value = 'image'
  }
}

function closeLightbox() {
  lightbox.value = null
  lightboxImageLoaded.value = false
  lightboxType.value = 'image'
}

// PDF fallback for iframe error
function onIframeError(event) {
  lightboxImageLoaded.value = false
  lightboxType.value = 'pdf-error'
}

// --- Utility function for PDF label ---
function getPdfLabel(path) {
  // Extract filename and remove .pdf extension (case-insensitive)
  const parts = path.split('/')
  let filename = parts[parts.length - 1]
  if (filename.toLowerCase().endsWith('.pdf')) {
    filename = filename.slice(0, -4)
  }
  return filename
}

function handleInfographicImageLoad(event, i) {
  infographicImageLoading.value[`info-${i}`] = false
}
function handleInfographicImageError(event, i) {
  infographicImageLoading.value[`info-${i}`] = false
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
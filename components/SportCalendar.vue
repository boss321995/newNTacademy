<template>
  <div class="w-full max-w-5xl mx-auto py-10">
    <h2 class="text-2xl font-bold text-blue-900 mb-6 text-center">ตารางการใช้งานสนามกีฬา</h2>
    <div class="flex justify-center mb-4 gap-2">
      <button
        v-for="mode in modes"
        :key="mode"
        @click="viewMode = mode"
        :class="[
          'px-4 py-2 rounded transition',
          viewMode === mode ? 'bg-blue-900 text-white shadow' : 'bg-gray-200 text-blue-900 hover:bg-blue-100'
        ]"
      >
        {{ modeLabel[mode] }}
      </button>
    </div>

    <!-- รายวัน -->
    <div v-if="viewMode === 'day'" class="mb-6">
      <div class="flex justify-center items-center gap-2 mb-2">
        <button @click="prevDay" class="px-2 py-1 bg-gray-200 rounded shadow hover:bg-blue-100">&lt;</button>
        <span class="font-semibold text-lg">{{ formatDate(currentDay) }}</span>
        <button @click="nextDay" class="px-2 py-1 bg-gray-200 rounded shadow hover:bg-blue-100">&gt;</button>
      </div>
      <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
        <table class="min-w-full text-center">
          <thead>
            <tr class="bg-blue-900 text-white">
              <th class="py-2 px-4">เวลา</th>
              <th v-for="field in fields" :key="field" class="py-2 px-4">{{ field }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slot in timeSlots" :key="slot" class="border-b">
              <td class="py-2 px-4 font-semibold bg-gray-50">{{ slot }}</td>
              <td v-for="field in fields" :key="field" class="py-2 px-4">
                <div
                  :class="[
                    'rounded-lg p-2',
                    getStatusDay(currentDay, slot, field) === 'available' && 'bg-green-50 border border-green-200',
                    getStatusDay(currentDay, slot, field) === 'booked' && 'bg-yellow-50 border border-yellow-200',
                    getStatusDay(currentDay, slot, field) === 'maintenance' && 'bg-red-50 border border-red-200'
                  ]"
                >
                  <span :class="statusClass(getStatusDay(currentDay, slot, field))">
                    {{ statusLabel[getStatusDay(currentDay, slot, field)] }}
                  </span>
                  <template v-if="getStatusDay(currentDay, slot, field) === 'booked'">
                    <div class="text-xs text-gray-700 mt-1">
                      <div>ชื่อ: {{ getBookingDetail(currentDay, slot, field).name }}</div>
                      <div>เบอร์: {{ getBookingDetail(currentDay, slot, field).phone }}</div>
                    </div>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- รายเดือน -->
    <div v-else-if="viewMode === 'month'" class="mb-6">
      <div class="flex justify-center items-center gap-2 mb-2">
        <button @click="prevMonth" class="px-2 py-1 bg-gray-200 rounded shadow hover:bg-blue-100">&lt;</button>
        <span class="font-semibold text-lg">{{ monthYearLabel(currentMonth) }}</span>
        <button @click="nextMonth" class="px-2 py-1 bg-gray-200 rounded shadow hover:bg-blue-100">&gt;</button>
      </div>
      <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
        <table class="min-w-full text-center">
          <thead>
            <tr class="bg-blue-900 text-white">
              <th class="py-2 px-4">วันที่</th>
              <th v-for="field in fields" :key="field" class="py-2 px-4">{{ field }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="date in daysInMonth(currentMonth)" :key="date">
              <td class="py-2 px-4 bg-gray-50">{{ formatDate(date) }}</td>
              <td v-for="field in fields" :key="field" class="py-2 px-4">
                <span :class="statusClass(getStatusMonth(date, field))">
                  {{ statusLabel[getStatusMonth(date, field)] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ทั้งปี -->
    <div v-else>
      <div class="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
        <table class="min-w-full text-center">
          <thead>
            <tr class="bg-blue-900 text-white">
              <th class="py-2 px-4">เดือน</th>
              <th v-for="field in fields" :key="field" class="py-2 px-4">{{ field }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="month in 12" :key="month">
              <td class="py-2 px-4 bg-gray-50">{{ yearMonthLabel(currentYear, month) }}</td>
              <td v-for="field in fields" :key="field" class="py-2 px-4">
                <span :class="statusClass(getStatusOfMonth(currentYear, month, field))">
                  {{ statusLabel[getStatusOfMonth(currentYear, month, field)] }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-4 text-sm text-gray-600">
      <p><span class="text-green-600 font-bold">ว่าง</span> = สามารถจองได้</p>
      <p><span class="text-yellow-600 font-bold">จองแล้ว</span> = มีผู้จอง</p>
      <p><span class="text-red-600 font-bold">ปิดปรับปรุง</span> = ไม่เปิดให้บริการ</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fields = [
  'สนามฟุตบอล',
  'แบตมินตัน 1',
  'แบตมินตัน 2',
  'แบตมินตัน 3',
  'สนามกีฬาในร่ม'
]
const timeSlots = ['08:00-10:00', '10:00-12:00', '13:00-15:00', '15:00-17:00', '17:00-19:00']

// โหมดการแสดงผล
const modes = ['day', 'month', 'year']
const modeLabel = { day: 'รายวัน', month: 'รายเดือน', year: 'ทั้งปี' }
const statusLabel = { available: 'ว่าง', booked: 'จองแล้ว', maintenance: 'ปิดปรับปรุง' }
const statusClass = status =>
  status === 'available'
    ? 'text-green-600 font-bold'
    : status === 'booked'
    ? 'text-yellow-600 font-bold'
    : 'text-red-600 font-bold'

// วันที่ปัจจุบัน
const today = new Date()
const currentDay = ref(new Date(today))
const currentMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const currentYear = today.getFullYear()
const viewMode = ref('day')

// ข้อมูลจำลอง (วันนี้มีจอง 4 ชั่วโมง, มีชื่อและเบอร์, ปิดปรับปรุง 1 สนามทั้งวัน)
const todayISO = today.toISOString().split('T')[0]
const bookings = [
  // จองสนามฟุตบอล 2 ช่วงเวลา
  { date: todayISO, slot: '10:00-12:00', field: 'สนามฟุตบอล', status: 'booked', detail: { name: 'คุณสมชาย', phone: '081-111-2222' } },
  { date: todayISO, slot: '13:00-15:00', field: 'สนามฟุตบอล', status: 'booked', detail: { name: 'คุณสมชาย', phone: '081-111-2222' } },
  // จองแบตมินตัน 1 สองช่วงเวลา
  { date: todayISO, slot: '15:00-17:00', field: 'แบตมินตัน 1', status: 'booked', detail: { name: 'คุณสมศรี', phone: '089-222-3333' } },
  { date: todayISO, slot: '17:00-19:00', field: 'แบตมินตัน 1', status: 'booked', detail: { name: 'คุณสมศรี', phone: '089-222-3333' } },
  // ปิดปรับปรุงแบตมินตัน 2 ทั้งวัน
  { date: todayISO, slot: 'all', field: 'แบตมินตัน 2', status: 'maintenance' }
]

// ฟังก์ชันสำหรับรายวัน
function getStatusDay(date, slot, field) {
  const d = formatDateISO(date)
  // ถ้าสนามนี้ปิดปรับปรุงทั้งวัน
  const maint = bookings.find(b => b.date === d && b.slot === 'all' && b.field === field && b.status === 'maintenance')
  if (maint) return 'maintenance'
  const found = bookings.find(b => b.date === d && b.slot === slot && b.field === field)
  if (found) return found.status
  return 'available'
}
function getBookingDetail(date, slot, field) {
  const d = formatDateISO(date)
  const found = bookings.find(b => b.date === d && b.slot === slot && b.field === field && b.status === 'booked')
  return found ? found.detail : { name: '', phone: '' }
}

// ฟังก์ชันสำหรับรายเดือน
function daysInMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const days = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1))
}
function getStatusMonth(date, field) {
  const d = formatDateISO(date)
  // ถ้าสนามนี้ปิดปรับปรุงทั้งวัน
  const maint = bookings.find(b => b.date === d && b.slot === 'all' && b.field === field && b.status === 'maintenance')
  if (maint) return 'maintenance'
  // ถ้ามีจองในวันนั้น
  const booked = bookings.find(b => b.date === d && b.field === field && b.status === 'booked')
  if (booked) return 'booked'
  return 'available'
}

// ฟังก์ชันสำหรับรายปี
function getStatusOfMonth(year, month, field) {
  // ถ้าสนามนี้ปิดปรับปรุงทั้งเดือน (ดูจากข้อมูลจำลองเฉพาะวันแรกของเดือน)
  const maint = bookings.find(
    b =>
      b.field === field &&
      b.status === 'maintenance' &&
      new Date(b.date).getFullYear() === year &&
      new Date(b.date).getMonth() + 1 === month
  )
  if (maint) return 'maintenance'
  // ถ้ามีจองในเดือนนั้น
  const booked = bookings.find(
    b =>
      b.field === field &&
      b.status === 'booked' &&
      new Date(b.date).getFullYear() === year &&
      new Date(b.date).getMonth() + 1 === month
  )
  if (booked) return 'booked'
  return 'available'
}

// ฟอร์แมตวันที่
function formatDate(date) {
  return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })
}
function formatDateISO(date) {
  if (typeof date === 'string') return date
  return date.toISOString().split('T')[0]
}
function monthYearLabel(date) {
  return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long' })
}
function yearMonthLabel(year, month) {
  return `${year} - ${month.toString().padStart(2, '0')}`
}

// เปลี่ยนวัน/เดือน
function prevDay() {
  currentDay.value = new Date(currentDay.value.getTime() - 86400000)
}
function nextDay() {
  currentDay.value = new Date(currentDay.value.getTime() + 86400000)
}
function prevMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1)
}
function nextMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1)
}
</script>
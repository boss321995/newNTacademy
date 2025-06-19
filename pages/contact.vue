<template>
  <div>
    <Header />
    <div class="max-w-4xl mx-auto py-10 px-4">
      <h1 class="text-3xl font-bold text-blue-900 mb-8 text-center">ติดต่อเรา</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- ข้อมูลติดต่อ -->
        <div>
          <h2 class="text-xl font-semibold mb-4 text-blue-800">NT Academy</h2>
          <p class="mb-2">ที่อยู่: 5 ซอย งามวงศ์วาน 17 ตำบลบางเขน อำเภอเมืองนนทบุรี นนทบุรี 11000</p>
          <p class="mb-2">โทรศัพท์: <a href="tel:025961221" class="text-blue-700 hover:underline">02 596 1221</a></p>
          
          <p class="mb-2">เวลาทำการ: จันทร์-ศุกร์ 08:30-16:30 น.</p>
          
        </div>
        <!-- Google Map -->
        <div>
          <iframe
            class="w-full h-72 rounded-lg shadow"
            src="https://www.google.com/maps?q=5+ซอย+งามวงศ์วาน+17+ตำบลบางเขน+อำเภอเมืองนนทบุรี+นนทบุรี+11000&output=embed"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "ContactUs",
};
</script>

<style scoped>
</style>
<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Add any global styles here */
</style>
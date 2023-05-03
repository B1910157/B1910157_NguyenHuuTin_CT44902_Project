<script>
import AppHeader from "@/components/AppHeader.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    AppHeader,
    Footer,
  },

};
</script>
<template>
  <div id="app">
    <AppHeader />
    <div class="container mt-3">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
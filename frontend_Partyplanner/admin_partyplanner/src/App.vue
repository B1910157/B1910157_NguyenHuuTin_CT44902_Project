<script>
import AppHeader from "@/components/AppHeader.vue";
// import AppAdmin from "./components/AppAdmin.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    AppHeader,
    // AppAdmin,
    Footer
},

};
</script>
<template>
  <div id="app">
    <AppHeader />
    <!-- <AppAdmin></AppAdmin> -->
    <div class="container mt-3">
      <router-view />
    </div>
    
  </div>
  <Footer></Footer>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
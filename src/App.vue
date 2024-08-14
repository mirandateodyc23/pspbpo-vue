<script setup>
import { RouterView } from 'vue-router'
import Header from './components/HeaderComponent.vue'
import Footer from './components/FooterComponent.vue'
import BackToTop from './components/BackToTopComponent.vue'

</script>

<template>
  <main>
    <div id="loader-wrapper">
      <div id="loader"></div>

      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>

    </div>
    <div class="u-all">
      <Header />
      <RouterView />
      <Footer />
    </div>
  </main>
    <BackToTop />
</template>

<style>
.v-application__wrap {
  min-height: 0vh !important;
}
</style>

<template>
  <Navbar/>
  <router-view :key="$route.fullPath"/>
  <Footer/>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: {
    Navbar : Navbar,
    Footer : Footer,
  },
};
</script>

<style>

</style>

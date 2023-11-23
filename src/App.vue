<template>
  <Navbar/>
  <Schedule/>
  <Footer/>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Schedule from "./components/Schedule.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: {
    Navbar : Navbar,
    Schedule : Schedule,
    Footer : Footer,
  },
  
};
</script>

<style>

</style>

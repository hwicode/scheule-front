<template>
  <Navbar/>
  <Calendar/>
  <Footer/>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Calendar from "./components/Calendar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: {
    Navbar : Navbar,
    Calendar : Calendar,
    Footer : Footer,
  },
  
};
</script>

<style>
.selector-for-some-widget {
  box-sizing: content-box;
}

</style>

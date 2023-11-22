<template>
  <Navbar/>
  <Calendar/>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Calendar from "./components/Calendar.vue";

export default {
  name: 'App',
  components: {
    Navbar : Navbar,
    Calendar : Calendar,
  },
  
};
</script>

<style>
.selector-for-some-widget {
  box-sizing: content-box;
}

</style>

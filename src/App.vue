<template>
  <Navbar/>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: 'App',
  components: {
    Navbar : Navbar,
  },
  
};
</script>

<style>
.selector-for-some-widget {
  box-sizing: content-box;
}

</style>

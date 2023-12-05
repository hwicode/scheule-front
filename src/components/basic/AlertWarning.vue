<template>
    <div v-if="isVisible" class="alert alert-warning" role="alert">
        {{ message }}
    </div>
</template>
  
<script>
export default {
    name: 'AlertWarning',
    props: {
        message: String,
        isVisible: Boolean,
    },
    watch: {
      isVisible() {
      if (this.isVisible) {
        setTimeout(() => {
          this.$emit('turnOff', false);
        }, 1500);
      }
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 700px) { 
    .alert {
        font-size: 1.25vw;
        padding: 6px 8px;
    }
}
</style>
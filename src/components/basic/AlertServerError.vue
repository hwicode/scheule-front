<template>
    <div v-if="isVisible" class="alert alert-danger" role="alert">
        알 수 없는 이유로 에러가 발생했습니다!
    </div>
</template>
  
<script>
export default {
    name: 'AlertServerError',
    props: {
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
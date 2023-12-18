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
        // 기존의 타이머를 취소
        clearTimeout(this.timer);

        // 새로운 타이머 시작
        this.timer = setTimeout(() => {
          this.$emit('turnOff', false);
        }, 1500);
      }
    },
  },
  beforeUnmount() {
    // 컴포넌트가 파괴되기 전에 타이머를 취소
    clearTimeout(this.timer);
  },
  data() {
    return {
      timer: null,
    };
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
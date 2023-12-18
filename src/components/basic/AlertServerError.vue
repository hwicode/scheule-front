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
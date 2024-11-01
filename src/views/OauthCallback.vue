<template>
  <div class="empty-screen">
    <Loading :active="true" class="vl-overlay"></Loading>
  </div>
</template>
  
<script>
import { loginWithOauth } from '@/api/sign-in.js';
import Loading from 'vue-loading-overlay';

export default {
  name: 'OauthCallback',
  components: {
    Loading: Loading
  },
  methods: {
    async fetchOauthLogin(oauthProvider, code) {
      try {
        await loginWithOauth(oauthProvider, code);
      } catch (error) {
          console.log(`오류가 발생했습니다: ${error}`);
      }
    },
  },
  async created() {
    const oauthProvider = this.$route.params.provider;
    const code = this.$route.query.code;
    await this.fetchOauthLogin(oauthProvider, code);

    this.$store.dispatch('tags/fetchTags');
    this.$store.dispatch('reviewCycles/fetchReviewCycles');
    this.$store.commit('login/login');

    this.$router.push('/calendar');
  }
};
</script>
  
<style scoped>
  .empty-screen {
    width: 100%;
    height: 60vh;
    box-sizing: border-box;
  }

  .vl-overlay {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
  
<template>
  <!-- 로그인 폼의 아래에 공백을 주기 위해 사용함 -->
  <div class="my-5 py-5"></div>
</template>
  
<script>
import { loginWithOauth } from '@/api/sign-in.js';

export default {
  name: 'OauthCallback',
  methods: {
    async fetchOauthLogin(oauthProvider, code) {
      try {
        const response = await loginWithOauth(oauthProvider, code);
        const token = response.headers.getAuthorization();
        sessionStorage.setItem('authToken', token);
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error}`);
      }
    },
  },
  async created() {
    const oauthProvider = this.$route.params.provider;
    const code = this.$route.query.code;
    await this.fetchOauthLogin(oauthProvider, code);

    this.$router.push('/calendar');
  }
};
</script>
  
<style scoped>

</style>
  
<template>

  <!-- 로그인 폼의 위에 공백을 주기 위해 사용함 -->
  <div class="my-4 py-4"></div>

  <div class="d-flex align-items-center justify-content-center">
    <div class="text-center">
      <div class="mb-4" style="background-color: black; display: inline-block;">
        <img src="/logo.png" alt="Logo" width="60" height="60">
      </div>

      <div>
        <h3 class="h4 mb-3">간편 로그인</h3>
        <button class="btn btn-outline-primary" @click="goToOauthLoginPage('GOOGLE')">
          <i class="bi bi-google"></i>
          <span class="px-2">구글 아이디로 로그인</span>
        </button>
      </div>

    </div>
  </div>

  <!-- 로그인 폼의 아래에 공백을 주기 위해 사용함 -->
  <div class="my-5 py-5"></div>

</template>
  
<script>
import { redirectToOauthLoginPage } from '@/api/sign-in.js';

export default {
  name: 'SignIn',
  methods: {
    async goToOauthLoginPage(oauthProvider) {
      try {
        await redirectToOauthLoginPage(oauthProvider);
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error}`);
      }
    },
  }
};
</script>
  
<style scoped>

</style>
  
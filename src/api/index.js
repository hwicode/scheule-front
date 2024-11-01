import axios from 'axios';
import { Mutex, tryAcquire } from 'async-mutex';

import router from '@/routes/router.js';
import store from '@/store/index.js';

const globalMutex = new Mutex();

function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    withCredentials: true,
  });

  instance.interceptors.request.use((config) => {
      const accessToken = sessionStorage.getItem('authToken');
      config.headers.Authorization = `${accessToken}`;
      return config;
    }
  );

  instance.interceptors.response.use(
    response => response,
    async (error) => {
      if (!sessionStorage.getItem('authToken')) {
        return Promise.reject(error);
      }

      if (error.response && error.response.status === 401) {
        try {
          await tryAcquire(globalMutex).runExclusive(async () => {
            // 액세스 토큰 재발급 요청
            await loginRequestApiInstance().post(`/auth/token`);
          });
        } catch (error) {
          // 락 or 액세스 토큰 발급 실패
          return Promise.reject(error);
        }

        // 액세스 토큰 재발급 성공 시 현재 페이지로 이동
        router.go();
      }

      return Promise.reject(error);
    }
  );
  return instance;
}

function loginRequestApiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    response => {
      const token = response.headers.getAuthorization();
      sessionStorage.setItem('authToken', token);
      return response;
    },
    error => {
      return handleLoginError(error);
    }
  )
  return instance;
}

function handleLoginError(error) {
  if (error.response) {
    store.commit('login/logout');
    router.push('/');
  }
  return Promise.reject(error);
}

function getApiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  return instance;
}

export { apiInstance, loginRequestApiInstance, getApiInstance };
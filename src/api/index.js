import axios from 'axios';
import router from '@/routes/router.js'
import { Mutex, tryAcquire, E_ALREADY_LOCKED } from 'async-mutex';

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
        let response;
        try {
          await tryAcquire(globalMutex).runExclusive(async () => {
            // 액세스 토큰 재발급 요청
            response = await loginRequestApiInstance().post(`/auth/token`);
          });
        } catch (error) {
          if (error === E_ALREADY_LOCKED) {
            return Promise.reject(error);
          }
        }

        // 액세스 토큰을 재발급 요청할 때, 리플레시 토큰 만료시 에러 리턴
        if (response.status === 401) {
          return;
        }

        // 재발급 요청이 계속 실패하면 무한 루프 위험 있음
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
    sessionStorage.removeItem('authToken');
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
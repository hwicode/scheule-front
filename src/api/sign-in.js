import { loginRequestApiInstance, apiInstance, getApiInstance } from './index.js';
const loginRequestApi = loginRequestApiInstance();
const api = apiInstance();
const getApi = getApiInstance();

function getOauthLoginPage(oauthProvider) {
    return getApi.get(`/oauth2/${oauthProvider}/login`);
}

function loginWithOauth(oauthProvider, code) {
    return loginRequestApi.get(`/oauth2/${oauthProvider}/callback`, {params: { code: code }});
}

function reissueAuthToken() {
    return loginRequestApi.post(`/auth/token`);
}

function logout() {
    const response = api.post(`/auth/logout`);
    sessionStorage.removeItem('authToken');
    return response;
}

export { getOauthLoginPage, loginWithOauth, reissueAuthToken, logout };
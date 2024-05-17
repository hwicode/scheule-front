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

function logout() {
    return api.post(`/auth/logout`);
}

export { getOauthLoginPage, loginWithOauth, logout };
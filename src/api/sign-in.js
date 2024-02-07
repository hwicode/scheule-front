import { apiInstance } from './index.js';
const api = apiInstance();

function redirectToOauthLoginPage(oauthProvider) {
    return api.get(`/oauth2/${oauthProvider}/login`);
}

export { redirectToOauthLoginPage };
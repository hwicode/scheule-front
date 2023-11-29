import { apiInstance } from './index.js';
const api = apiInstance();

function getTags() {
    return api.get('/tags');
}

export { getTags };
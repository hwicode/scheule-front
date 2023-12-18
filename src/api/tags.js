import { apiInstance } from './index.js';
const api = apiInstance();

function getTags() {
    return api.get('/tags');
}

function getAutocompletedTags(nameKeyword) {
    return api.get('/search/tags', {params: { nameKeyword: nameKeyword }});
}

export { getTags, getAutocompletedTags };
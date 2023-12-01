import { apiInstance } from './index.js';
const api = apiInstance();

function getMemos(id) {
    return api.get(`/dailyschedule/daily-tag-lists/${id}/memos`);
}
  
export { getMemos };
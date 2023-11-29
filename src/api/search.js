import { apiInstance } from './index.js';
const api = apiInstance();

function getFirstSchedules(tagId) {
    return api.get('/search/daily-tag-lists', { params: tagId });
}

function getSchedules(tagId, lastDailyTagListId) {
    return api.get('/search/daily-tag-lists', { params: tagId, lastDailyTagListId });
}

function getFirstMemos(tagId) {
    return api.get('/search/memos', { params: tagId });
}

function getMemos(tagId, lastMemoId) {
    return api.get('/search/memos', { params: tagId, lastMemoId });
}
  
export { getFirstSchedules, getSchedules, getFirstMemos, getMemos };
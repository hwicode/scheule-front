import { apiInstance } from './index.js';
const api = apiInstance();

function getMemos(id) {
    return api.get(`/dailyschedule/daily-tag-lists/${id}/memos`);
}

function saveMemoApi(dto) {
    return api.post(`/dailyschedule/memos`, {
        dailyTagListId: dto.dailyTagListId,
        text: dto.text
    });
}

function saveMemoWithTagsApi(dto) {
    return api.post(`/dailyschedule/memos/tags`, {
        dailyTagListId: dto.dailyTagListId,
        text: dto.text,
        tagIds: dto.tagIds
    });
}
  
export { getMemos, saveMemoApi, saveMemoWithTagsApi };
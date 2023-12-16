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

function changeMemoTextApi(dto) {
    return api.patch(`/dailyschedule/memos/${dto.memoId}`, {
        newText: dto.newText
    });
}

function addTagsToMemoApi(dto) {
    return api.post(`/dailyschedule/memos/${dto.memoId}/tags`, {
        tagIds: dto.tagIds
    });
}

function deleteMemoApi(memoId) {
    return api.delete(`/dailyschedule/memos/${memoId}`);
}

export { 
    getMemos, saveMemoApi, saveMemoWithTagsApi, changeMemoTextApi,
    addTagsToMemoApi, deleteMemoApi 
};
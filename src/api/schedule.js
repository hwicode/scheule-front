import { apiInstance } from './index.js';
const api = apiInstance();

function getSchedule(date) {
    return api.get('/dailyschedule/daily-todo-lists', { params: date });
}

function getScheduleTags(date) {
    return api.get('/dailyschedule/daily-tag-lists', { params: date });
}

function saveSchedule(date) {
    return api.post('/daily-todo-lists', { date: date })
}

function changeEmojiAndReviewApi(dto) {
    return api.patch(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/information`, {
        review: dto.review,
        emoji: dto.emoji
    });
}

function addTagToScheduleApi(dto) {
    return api.post(`/dailyschedule/daily-tag-lists/${dto.dailyTagListId}/tags`, {
        tagId: dto.tagId
    });
}

function deleteTagToScheduleApi(dto) {
    return api.delete(`/dailyschedule/daily-tag-lists/${dto.dailyTagListId}/tags/${dto.tagId}`);
}

function changeMainTagApi(dto) {
    return api.patch(`/dailyschedule/daily-tag-lists/${dto.dailyTagListId}/tags/${dto.tagId}`);
}

function saveTagApi(dto) {
    return api.post(`/dailyschedule/tags`, {
        tagName: dto.tagName
    });
}

function changeTagNameApi(dto) {
    return api.patch(`/dailyschedule/tags/${dto.tagId}`, {
        newTagName: dto.newTagName
    });
}

function deleteTagApi(tagId) {
    return api.delete(`/dailyschedule/tags/${tagId}`);
}
  
export { 
    getSchedule, getScheduleTags, saveSchedule, changeEmojiAndReviewApi,
    addTagToScheduleApi, deleteTagToScheduleApi, changeMainTagApi,
    saveTagApi, changeTagNameApi, deleteTagApi
};
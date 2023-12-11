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

function getReviewCyclesApi() {
    return api.get(`/dailyschedule/review-cycles`);
}

function saveReviewCycleApi(dto) {
    return api.post(`/dailyschedule/review-cycles`, {
        reviewCycleName: dto.reviewCycleName,
        cycle: dto.cycle
    })
}

function changeReviewCycleNameApi(dto) {
    return api.patch(`/dailyschedule/review-cycles/${dto.reviewCycleId}/name`, { newReviewCycleName: dto.newReviewCycleName });
}

function changeReviewCyclePeriodApi(dto) {
    return api.patch(`/dailyschedule/review-cycles/${dto.reviewCycleId}/cycle`, { cycle: dto.cycle });
}

function deleteReviewCycleApi(reviewCycleId) {
    return api.delete(`/dailyschedule/review-cycles/${reviewCycleId}`);
}

function changeEmojiAndReviewApi(dto) {
    return api.patch(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/information`, {
        review: dto.review,
        emoji: dto.emoji
    });
}
  
export { 
    getSchedule, getScheduleTags, saveSchedule, getReviewCyclesApi, 
    saveReviewCycleApi, changeReviewCycleNameApi, changeReviewCyclePeriodApi, deleteReviewCycleApi,
    changeEmojiAndReviewApi
};
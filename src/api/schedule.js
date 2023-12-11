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
  
export { getSchedule, getScheduleTags, saveSchedule, getReviewCyclesApi, saveReviewCycleApi };
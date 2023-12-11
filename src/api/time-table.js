import { apiInstance } from './index.js';
const api = apiInstance();

function getLearningTimes(date) {
    return api.get('/dailyschedule/timetables', { params: date });
}

function saveLearningTimeApi(dto) {
    return api.post(`/dailyschedule/timetables/${dto.timeTableId}/learning-times`,
     {
        startTime: dto.startTime
    });
}
  
export { getLearningTimes, saveLearningTimeApi };
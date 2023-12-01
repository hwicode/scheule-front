import { apiInstance } from './index.js';
const api = apiInstance();

function getLearningTimes(date) {
    return api.get('/dailyschedule/timetables', { params: date });
}
  
export { getLearningTimes };
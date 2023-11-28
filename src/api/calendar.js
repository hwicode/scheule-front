import { apiInstance } from './index.js';
const api = apiInstance();

function getCalendarAndGoals(queryParams, success, fail) {
    api.get(`/calendars`, { params: queryParams })
    .then(success)
    .catch(fail);
}
  
export { getCalendarAndGoals };
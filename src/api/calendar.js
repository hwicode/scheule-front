import { apiInstance } from './index.js';
const api = apiInstance();

function getCalendarAndGoals(yearMonth) {
    return api.get('/calendars', { params: yearMonth });
}
  
export { getCalendarAndGoals };
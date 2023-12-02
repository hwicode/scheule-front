import { apiInstance } from './index.js';
const api = apiInstance();

function getCalendarAndGoals(yearMonth) {
    return api.get('/calendars', { params: yearMonth });
}

function saveCalendar(yearMonth) {
    return api.post('/calendars', { yearMonth: yearMonth })
}
  
export { getCalendarAndGoals, saveCalendar };
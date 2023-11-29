import { apiInstance } from './index.js';
const api = apiInstance();

function getCalendarSchedules(yearMonth) {
    return api.get('/dailyschedule/calendar/daily-todo-lists', { params: yearMonth });
}
  
export { getCalendarSchedules };
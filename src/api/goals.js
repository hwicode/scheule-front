import { apiInstance } from './index.js';
const api = apiInstance();

function saveGoal(goalName, yearMonths) {
    return api.post('/calendars/goals', {goalName, yearMonths});
}
  
export { saveGoal };
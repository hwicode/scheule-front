import { apiInstance } from './index.js';
const api = apiInstance();

function saveGoal(goalName, yearMonths) {
    return api.post('/calendars/goals', {goalName, yearMonths});
}

function changeGoalName(dto) {
    return api.patch(`/calendars/${dto.calendarId}/goals/${dto.goalId}/name`,
     { 
        yearMonth: dto.yearMonth,
        goalName: dto.goalName,
        newGoalName: dto.newGoalName
    });
}
  
export { saveGoal, changeGoalName };
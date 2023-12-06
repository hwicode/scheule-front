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

function addGoalToCalendars(goalId, yearMonths) {
    return api.post(`/calendars/goals/${goalId}`, { yearMonths: yearMonths });
}

function changeGoalStatusApi(goalId, goalStatus) {
    return api.patch(`/goals/${goalId}/status`, { goalStatus: goalStatus });
}

function deleteGoalApi(goalId) {
    return api.delete(`/goals/${goalId}`);
}

function saveSubGoalApi(goalId, subGoalName) {
    return api.post(`/goals/${goalId}/sub-goals`, { subGoalName: subGoalName });
}

function changeSubGoalNameApi(dto) {
    return api.patch(`/goals/${dto.goalId}/sub-goals/${dto.subGoalId}/name`,
     { 
        subGoalName: dto.subGoalName,
        newSubGoalName: dto.newSubGoalName
    });
}

export { saveGoal, changeGoalName, addGoalToCalendars, changeGoalStatusApi, deleteGoalApi, saveSubGoalApi, changeSubGoalNameApi };
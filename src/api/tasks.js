import { apiInstance } from './index.js';
const api = apiInstance();

function saveTaskApi(dto) {
    return api.post(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks`,
     {
        dailyToDoListId: dto.dailyToDoListId,
        taskName: dto.taskName,
        difficulty: dto.difficulty,
        priority: dto.priority,
        importance: dto.importance
    });
}

function changeTaskNameApi(dto) {
    return api.patch(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/name`,
     { 
        dailyChecklistId: dto.dailyToDoListId,
        taskCheckerName: dto.taskName,
        newTaskCheckerName: dto.newTaskName
    });
}

export { saveTaskApi, changeTaskNameApi };
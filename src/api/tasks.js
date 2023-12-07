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

function deleteTaskApi(dailyToDoListId, taskId, taskName) {
    return api.delete(`/dailyschedule/daily-todo-lists/${dailyToDoListId}/tasks/${taskId}`, {params: { taskName: taskName }});
}

function changeTaskStatusApi(dto) {
    return api.patch(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/status`,
     {
        dailyChecklistId: dto.dailyToDoListId,
        taskCheckerName: dto.taskName,
        taskStatus: dto.taskStatus 
    });
}

export { saveTaskApi, changeTaskNameApi, deleteTaskApi, changeTaskStatusApi };
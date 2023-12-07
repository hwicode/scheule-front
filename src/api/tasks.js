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

function changeTaskPriorityOrImportanceApi(dto) {
    return api.patch(`/dailyschedule/tasks/${dto.taskId}/information`,
     {
        priority: dto.priority,
        importance: dto.importance,
    });
}

function changeTaskDifficultyApi(dto) {
    return api.patch(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/difficulty`,
     {
        dailyChecklistId: dto.dailyToDoListId,
        taskCheckerName: dto.taskName,
        difficulty: dto.difficulty 
    });
}

function saveSubTaskApi(dto) {
    return api.post(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/subtasks`,
     {
        dailyToDoListId: dto.dailyToDoListId,
        taskName: dto.taskName,
        subTaskName: dto.subTaskName
    });
}

export { saveTaskApi, changeTaskNameApi, deleteTaskApi, changeTaskStatusApi, changeTaskPriorityOrImportanceApi, changeTaskDifficultyApi, saveSubTaskApi };
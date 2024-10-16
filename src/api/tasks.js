import { apiInstance } from './index.js';
const api = apiInstance();

function saveTaskApi(dto) {
    return api.post(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks`,
     {
        taskName: dto.taskName,
        difficulty: dto.difficulty,
        priority: dto.priority,
        importance: dto.importance
    });
}

function changeTaskNameApi(dto) {
    return api.patch(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/name`,
     { 
        taskName: dto.taskName,
        newTaskName: dto.newTaskName
    });
}

function deleteTaskApi(dailyToDoListId, taskId, taskName) {
    return api.delete(`/dailyschedule/daily-todo-lists/${dailyToDoListId}/tasks/${taskId}`, {params: { taskName: taskName }});
}

function changeTaskStatusApi(dto) {
    return api.patch(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/status`,
     {
        taskName: dto.taskName,
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
        taskName: dto.taskName,
        difficulty: dto.difficulty 
    });
}

function reviewTaskApi(dto) {
    return api.post(`/dailyschedule/tasks/${dto.taskId}/review`, 
    {
        reviewCycleId: dto.reviewCycleId,
        startDate: dto.startDate
    });
}

function cancelReviewdTaskApi(taskId) {
    return api.delete(`/dailyschedule/tasks/${taskId}/review`);
}


function saveSubTaskApi(dto) {
    return api.post(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/subtasks`,
     {
        taskName: dto.taskName,
        subTaskName: dto.subTaskName
    });
}

function changeSubTaskNameApi(dto) {
    return api.patch(`/dailyschedule/tasks/${dto.taskId}/subtasks/${dto.subTaskId}/name`,
     {
        subTaskName: dto.subTaskName,
        newSubTaskName: dto.newSubTaskName
    });
}

function deleteSubTaskApi(dto) {
    return api.delete(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/subtasks/${dto.subTaskId}`, {
        params: { 
            taskName: dto.taskName,
            subTaskName: dto.subTaskName
        }
    });
}

function changeSubTaskStatusApi(dto) {
    return api.patch(`/dailyschedule/daily-todo-lists/${dto.dailyToDoListId}/tasks/${dto.taskId}/subtasks/${dto.subTaskId}/status`,
     {
        taskName: dto.taskName,
        subTaskName: dto.subTaskName,
        subTaskStatus: dto.subTaskStatus
    });
}

export { 
    saveTaskApi, changeTaskNameApi, deleteTaskApi, changeTaskStatusApi,
    changeTaskPriorityOrImportanceApi, changeTaskDifficultyApi, reviewTaskApi, cancelReviewdTaskApi,
    saveSubTaskApi, changeSubTaskNameApi, deleteSubTaskApi, changeSubTaskStatusApi
};
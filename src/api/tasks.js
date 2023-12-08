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

function getReviewCyclesApi() {
    return api.get(`/dailyschedule/review-cycles`);
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
        dailyToDoListId: dto.dailyToDoListId,
        taskName: dto.taskName,
        subTaskName: dto.subTaskName
    });
}

function changeSubTaskNameApi(dto) {
    return api.patch(`/dailyschedule/tasks/${dto.taskId}/subtasks/${dto.subTaskId}/name`,
     {
        taskCheckerId: dto.taskId,
        subTaskCheckerName: dto.subTaskName,
        newSubTaskCheckerName: dto.newSubTaskName
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
        dailyChecklistId: dto.dailyToDoListId,
        taskCheckerName: dto.taskName,
        subTaskCheckerName: dto.subTaskName,
        subTaskStatus: dto.subTaskStatus
    });
}

export { 
    saveTaskApi, changeTaskNameApi, deleteTaskApi, changeTaskStatusApi,
    changeTaskPriorityOrImportanceApi, changeTaskDifficultyApi, getReviewCyclesApi, reviewTaskApi,
    cancelReviewdTaskApi, saveSubTaskApi, changeSubTaskNameApi, deleteSubTaskApi,
    changeSubTaskStatusApi
};
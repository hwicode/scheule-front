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

export { saveTaskApi };
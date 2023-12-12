import { apiInstance } from './index.js';
const api = apiInstance();

function getLearningTimes(date) {
    return api.get('/dailyschedule/timetables', { params: date });
}

function saveLearningTimeApi(dto) {
    return api.post(`/dailyschedule/timetables/${dto.timeTableId}/learning-times`,
     {
        startTime: dto.startTime
    });
}

function changeStartTimeApi(dto) {
    return api.patch(`/dailyschedule/timetables/${dto.timeTableId}/learning-times/${dto.learningTimeId}/start-time`,
     {
        startTime: dto.startTime,
        newStartTime: dto.newStartTime
    });
}

function changeEndTimeApi(dto) {
    return api.patch(`/dailyschedule/timetables/${dto.timeTableId}/learning-times/${dto.learningTimeId}/end-time`,
     {
        startTime: dto.startTime,
        endTime: dto.endTime
    });
}

function deleteLearningTime(dto) {
    return api.delete(`/dailyschedule/timetables/${dto.timeTableId}/learning-times/${dto.learningTimeId}`, {params: { startTime: dto.startTime }});
}
  
export { getLearningTimes, saveLearningTimeApi, changeStartTimeApi, changeEndTimeApi, deleteLearningTime };
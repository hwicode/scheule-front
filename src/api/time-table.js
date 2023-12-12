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

function deleteLearningTimeApi(dto) {
    return api.delete(`/dailyschedule/timetables/${dto.timeTableId}/learning-times/${dto.learningTimeId}`, {params: { startTime: dto.startTime }});
}

function deleteLearningSubjectApi(learningTimeId) {
    return api.delete(`/dailyschedule/learning-times/${learningTimeId}`);
}

function changeSubjectApi(dto) {
    return api.patch(`/dailyschedule/learning-times/${dto.learningTimeId}/subject`,
    {
        newSubject: dto.newSubject
    });
}

function changeTaskOfSubjectApi(dto) {
    return api.patch(`/dailyschedule/learning-times/${dto.learningTimeId}/subject-of-task`, 
    {
        subjectOfTaskId: dto.subjectOfTaskId
    });
}

function changeSubTaskOfSubjectApi(dto) {
    return api.patch(`/dailyschedule/learning-times/${dto.learningTimeId}/subject-of-subtask`, 
    {
        subjectOfSubTaskId: dto.subjectOfSubTaskId
    });
}
  
export { 
    getLearningTimes, saveLearningTimeApi, changeStartTimeApi, changeEndTimeApi,
    deleteLearningTimeApi, deleteLearningSubjectApi, changeSubjectApi, changeTaskOfSubjectApi,
    changeSubTaskOfSubjectApi,
};
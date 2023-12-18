import { apiInstance } from './index.js';
const api = apiInstance();

function getReviewCyclesApi() {
    return api.get(`/dailyschedule/review-cycles`);
}

function saveReviewCycleApi(dto) {
    return api.post(`/dailyschedule/review-cycles`, {
        reviewCycleName: dto.reviewCycleName,
        cycle: dto.cycle
    })
}

function changeReviewCycleNameApi(dto) {
    return api.patch(`/dailyschedule/review-cycles/${dto.reviewCycleId}/name`, { newReviewCycleName: dto.newReviewCycleName });
}

function changeReviewCyclePeriodApi(dto) {
    return api.patch(`/dailyschedule/review-cycles/${dto.reviewCycleId}/cycle`, { cycle: dto.cycle });
}

function deleteReviewCycleApi(reviewCycleId) {
    return api.delete(`/dailyschedule/review-cycles/${reviewCycleId}`);
}

export { 
    getReviewCyclesApi, saveReviewCycleApi, changeReviewCycleNameApi, changeReviewCyclePeriodApi,
    deleteReviewCycleApi
};
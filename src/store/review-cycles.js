import { getReviewCyclesApi } from '@/api/review-cycles.js';

const state = {
    reviewCycles: null,
};

const mutations = {
    setReviewCycles(state, reviewCycles) {
        state.reviewCycles = reviewCycles;
    },

    addReviewCycle(state, reviewCycle) {
        reviewCycle = initializeReviewCycle(reviewCycle);
        state.reviewCycles.push(reviewCycle);
        updateReviewCycles(state);
    },

    changeReviewCycleName(state, payload) {    
        payload.reviewCycle.name = payload.newReviewCycleName;    
        updateReviewCycles(state);
    },

    changeReviewCyclePeriod(state, payload) {    
        payload.reviewCycle.reviewCycleDates = payload.newReviewCycleDates;   
        updateReviewCycles(state); 
    },

    deleteReviewCycle(state, reviewcycle) {
        state.reviewCycles = state.reviewCycles.filter(item => item.id !== reviewcycle.id);
        updateReviewCycles(state);
    },

    showReviewCycleChangeForm(state, reviewcycle) {
        closeAllReviewCycleChangeForm(state);
        reviewcycle.showReviewCycleChangeForm = !reviewcycle.showReviewCycleChangeForm;
    },

    showReviewCyclePeriodForm(state, reviewcycle) {
        closeAllReviewCyclePeriodForm(state);
        reviewcycle.showReviewCyclePeriodForm = !reviewcycle.showReviewCyclePeriodForm;
    },

    showReviewCycleDeleteForm(state, reviewcycle) {
        closeAllReviewCycleDeleteForm(state);
        reviewcycle.showReviewCycleDeleteForm = !reviewcycle.showReviewCycleDeleteForm;
    },

    closeReviewCycleChangeForm(state, reviewCycle) {
        reviewCycle.showReviewCycleChangeForm = false;
    },

    closeReviewCyclePeriodForm(state, reviewCycle) {
        reviewCycle.showReviewCyclePeriodForm = false;
    },

    closeReviewCycleDeleteForm(state, reviewCycle) {
        reviewCycle.showReviewCycleDeleteForm = false;
    },
};

const actions = {
    async fetchReviewCycles({ commit }) {
        try {
          const response = await getReviewCyclesApi();
          const reviewCycles = response.data.map(reviewCycle => {
            return initializeReviewCycle(reviewCycle);
          })
          commit('setReviewCycles', reviewCycles);
          sessionStorage.setItem('reviewCycles', JSON.stringify(state.reviewCycles));
        } catch (error) {
          console.error(`오류가 발생했습니다: ${error.message}`);
        }
    },

    loadReviewCycles({ commit }) {
        commit('setReviewCycles', JSON.parse(sessionStorage.getItem('reviewCycles')));
    },
};

function initializeReviewCycle(reviewCycle) {
    return {
        ...reviewCycle,
        showReviewCycleChangeForm: false,
        showReviewCyclePeriodForm: false,
        showReviewCycleDeleteForm: false,
    };
}

function closeAllReviewCycleChangeForm(state) {
    state.reviewCycles.forEach(reviewCycle => reviewCycle.showReviewCycleChangeForm = false);
}

function closeAllReviewCyclePeriodForm(state) {
    state.reviewCycles.forEach(reviewCycle => reviewCycle.showReviewCyclePeriodForm = false);
}

function closeAllReviewCycleDeleteForm(state) {
    state.reviewCycles.forEach(reviewCycle => reviewCycle.showReviewCycleDeleteForm = false);
}

function updateReviewCycles(state) {   
    sessionStorage.setItem('reviewCycles', JSON.stringify(state.reviewCycles));
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
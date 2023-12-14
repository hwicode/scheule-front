const state = {
    emojis: null,
};

const mutations = {
    initialize(state) {
        state.emojis = new Map();
        state.emojis.set('GOOD', '😁');
        state.emojis.set('NOT_BAD', '🙂');
        state.emojis.set('BAD', '😟');
    },
};

export default {
    namespaced: true,
    state,
    mutations,
};
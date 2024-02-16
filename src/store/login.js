const state = {
    login: false,
};

const mutations = {
    setLogin(state, login) {
        state.login = login;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
};
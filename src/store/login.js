const state = {
    login: false,
};

const mutations = {
    login(state) {
        state.login = true;
        sessionStorage.setItem('login', true);
    },
    logout(state) {
        state.login = false;
        sessionStorage.clear();
        sessionStorage.setItem('login', false);
    },
};

const actions = {
    loadLogin({ commit }) {
        const login = JSON.parse(sessionStorage.getItem('login'));
        if (login) {
            commit('login');
        } else {
            commit('logout');
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
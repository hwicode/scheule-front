import { getTags } from '@/api/tags.js';

const state = {
    tags: null,
};

const mutations = {
    setTags(state, tagsMap) {
        state.tags = tagsMap;
    },
};

const actions = {
    async fetchTags({ commit, state }) {
        if (!state.tags) {
            try {
                const response = await getTags();
                const tagsMap = new Map(response.data.map(tag => [tag.name, tag.id]));
                commit('setTags', tagsMap);
            } catch (error) {
                console.error(`오류가 발생했습니다: ${error.message}`);
            }
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
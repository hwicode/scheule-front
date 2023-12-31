import { getTags } from '@/api/tags.js';

const state = {
    tags: null,
    tagsMap: null,
};

const mutations = {
    setTags(state, tags) {
        state.tags = tags;
    },

    setTagsMap(state, tagsMap) {
        state.tagsMap = tagsMap;
    },

    addTag(state, tag) {
        tag = initializeTag(tag);
        state.tags.push(tag)
        state.tagsMap.set(tag.name, tag);
    },

    changeTagName(state, payload) {  
        state.tagsMap.delete(payload.tag.name);    
        payload.tag.name = payload.newTagName;
        state.tagsMap.set(payload.newTagName, payload.tag);      
    },

    deleteTag(state, tag) {
        state.tags = state.tags.filter(item => item.id !== tag.id);
        state.tagsMap.delete(tag.name);
    },

    showTagChangeForm(state, tag) {
        closeAllTagChangeForm(state);
        tag.showTagChangeForm = !tag.showTagChangeForm;
    },

    showTagDeleteForm(state, tag) {
        closeAllTagDeleteForm(state);
        tag.showTagDeleteForm = !tag.showTagDeleteForm;
    },

    closeTagChangeForm(state, tag) {
        tag.showTagChangeForm = false;
    },

    closeTagDeleteForm(state, tag) {
        tag.showTagDeleteForm = false;
    },
};

const actions = {
    async fetchTags({ commit, state }) {
        if (!state.tags) {
            try {
                const response = await getTags();
                const tagsMap = new Map(response.data.map(tag => {
                    tag = initializeTag(tag);
                    return [tag.name, tag];
                }));
                commit('setTags', response.data);
                commit('setTagsMap', tagsMap);
            } catch (error) {
                console.error(`오류가 발생했습니다: ${error.message}`);
            }
        }
    },
};

function initializeTag(tag) {
    return {
        ...tag,
        showTagChangeForm: false,
        showTagDeleteForm: false,
    };
}

function closeAllTagChangeForm(state) {
    state.tags.forEach(tag => tag.showTagChangeForm = false);
}

function closeAllTagDeleteForm(state) {
    state.tags.forEach(tag => tag.showTagDeleteForm = false);
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
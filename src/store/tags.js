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
        state.tags.push(tag);
        state.tagsMap.set(tag.name, tag);
        updateTags(state);
    },

    changeTagName(state, payload) {  
        state.tagsMap.delete(payload.tag.name);    
        payload.tag.name = payload.newTagName;
        state.tagsMap.set(payload.newTagName, payload.tag);
        updateTags(state);    
    },

    deleteTag(state, tag) {
        state.tags = state.tags.filter(item => item.id !== tag.id);
        state.tagsMap.delete(tag.name);
        updateTags(state);  
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
        try {
            const response = await getTags();
            const tagsMap = new Map(response.data.map(tag => {
                tag = initializeTag(tag);
                return [tag.name, tag];
            }));
            commit('setTags', response.data);
            commit('setTagsMap', tagsMap);
            sessionStorage.setItem('tags', JSON.stringify(state.tags));
            const mapArray = Array.from(state.tagsMap.entries());
            sessionStorage.setItem('tagsMap', JSON.stringify(mapArray));
        } catch (error) {
            console.error(`오류가 발생했습니다: ${error.message}`);
        }
    },

    loadTags({ commit }) {
        commit('setTags', JSON.parse(sessionStorage.getItem('tags')));
        const storedMapArray = JSON.parse(sessionStorage.getItem('tagsMap'));
        commit('setTagsMap', new Map(storedMapArray));
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

function updateTags(state) {   
    sessionStorage.setItem('tags', JSON.stringify(state.tags));
    const mapArray = Array.from(state.tagsMap.entries());
    sessionStorage.setItem('tagsMap', JSON.stringify(mapArray));
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
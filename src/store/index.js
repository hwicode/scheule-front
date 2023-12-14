import { createStore } from 'vuex'
import tags from './tags';
import emojis from './emojis';


const store = createStore({
  modules: {
    tags,
    emojis,
  },
});

// 모듈이 많아지면 모듈 이름을 배열로 만들어서 처리하기
store.dispatch('tags/fetchTags');
store.commit('emojis/initialize')
  
export default store
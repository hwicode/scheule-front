import { createStore } from 'vuex'
import tags from './tags';

const store = createStore({
  modules: {
    tags,
  },
});

// 모듈이 많아지면 모듈 이름을 배열로 만들어서 처리하기
store.dispatch('tags/fetchTags');
  
export default store
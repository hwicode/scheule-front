import { createStore } from 'vuex'
import tags from './tags';
import emojis from './emojis';
import reviewCycles from './review-cycles';

const store = createStore({
  modules: {
    tags,
    emojis,
    reviewCycles
  },
});

// 모듈이 많아지면 모듈 이름을 배열로 만들어서 처리하기
store.dispatch('tags/fetchTags');
store.commit('emojis/initialize');
store.dispatch('reviewCycles/fetchReviewCycles');
  
export default store
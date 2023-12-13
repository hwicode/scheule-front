import { createStore } from 'vuex'
import tags from './tags';

const store = createStore({
  modules: {
    tags,
  },
});
  
export default store
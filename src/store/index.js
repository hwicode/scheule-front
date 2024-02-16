import { createStore } from 'vuex'
import tags from './tags';
import emojis from './emojis';
import reviewCycles from './review-cycles';
import login from './login';

const store = createStore({
  modules: {
    tags,
    emojis,
    reviewCycles,
    login
  },
});

export default store
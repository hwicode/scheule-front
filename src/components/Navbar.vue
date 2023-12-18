<template>
  <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">
      <img src="/logo.png" alt="Logo" width="50" height="50">
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :to="{ path: '/schedule', query: { date: this.getFormattedDate() }}" class="nav-link">
            Daily Schedule
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            Calendar
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="#" class="nav-link">
            LogIn
          </router-link>
        </li>
      </ul>

      <form class="d-flex align-items-center" role="search">
        <div class="dropdown mr-2">
          <button class="btn btn-xs dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ searchTopic }}
          </button>
          <ul class="dropdown-menu dropdown-menu-xs">
            <li v-for="(topic, index) in topics" :key="index" @click="changeTopic(index)" class="dropdown-item" style="cursor:pointer;">
              {{ topic }}
            </li>
          </ul>
        </div>
        <div class="autocomplete-container">
          <input v-model="tagInput" 
                 @input="autocomplete"
                 @click="this.showAutocompletedTags = !this.showAutocompletedTags"
                 class="form-control me-2" type="search" placeholder="태그 이름을 입력하세요." aria-label="Search">
          <ul v-if="showAutocompletedTags" class="autocomplete-list">
            <li v-for="(tag, index) in autocompletedTags" :key="index" @click="selectTag(tag)" class="name-hover">
              {{ tag.name }}
            </li>
          </ul>
        </div>
        <button @click.prevent="search" class="btn btn-outline-success">Search</button>
      </form>

    </div>
  </div>
</nav>

</template>

<script>
import { getAutocompletedTags } from '@/api/tags.js';

export default {
  name: 'Navbar',
  data() {
    return {
      topics: ['계획표', '메모'],
      searchTopic: '계획표',
      tagInput: '',
      autocompletedTags: [],
      showAutocompletedTags: false,
      debounceTimer: null,
    };
  },
  computed: {
    tagsMap() {
      return this.$store.state.tags.tagsMap;
    },
  },
  methods: {
    getFormattedDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}-${month.toString().padStart(2, '0')}-${day}`;
    },  

    changeTopic(index) {
      this.searchTopic = this.topics[index];
    },

    autocomplete() {
      clearTimeout(this.debounceTimer);
      if (this.tagInput === '') {
        this.autocompletedTags = [];
        return;
      }

      this.debounceTimer = setTimeout(() => {
        this.fetchAutocompletedTags(this.tagInput);
      }, 1500);
    },

    async fetchAutocompletedTags(tagName) {
      try {
        const response = await getAutocompletedTags(tagName);
        this.autocompletedTags = response.data;
        this.showAutocompletedTags = response.data.length > 0;
      } catch (error) {
        console.error(`오류가 발생했습니다: ${error.message}`);
      }
    },

    selectTag(tag) {
      this.tagInput = tag.name;
      this.showAutocompletedTags = false;
    },

    search() {
      this.showAutocompletedTags = false;
      const tagId = this.tagsMap.get(this.tagInput) === undefined ? undefined : this.tagsMap.get(this.tagInput).id;
      
      this.$router.push({
        path: '/search',
        query: {
          searchTopic: this.searchTopic,
          tag: this.tagInput
        },
        state: {
          tagId: tagId,
        },
      });
    },
  },
}
</script>

<style scoped>
  .btn-xs {
    padding: 0.25rem 0.75rem;
    font-size: 1rem;
  }

  .router-link-active .nav-link {
    text-decoration: none;
  }

.autocomplete-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.autocomplete-list {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

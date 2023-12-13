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
        <input v-model="tagInput" class="form-control me-2 " type="search" placeholder="태그 이름을 입력하세요." aria-label="Search">
        <button @click.prevent="search" class="btn btn-outline-success">Search</button>
      </form>

    </div>
  </div>
</nav>

</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      topics: ['계획표', '메모'],
      searchTopic: '계획표',
      tagInput: '',
    };
  },
  computed: {
    tags() {
      return this.$store.state.tags.tags;
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

    search() {
      const tagId = this.tags.get(this.tagInput);
      
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
created() {
    this.$store.dispatch('tags/fetchTags');
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
</style>

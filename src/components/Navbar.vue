<template>
  <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Daily Schedule</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">LogIn</a>
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
        <input class="form-control me-2 " type="search" placeholder="태그 이름을 입력하세요." aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
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
    };
  },
  methods: {
    changeTopic(index) {
      this.searchTopic = this.topics[index];
    },
  },
}
</script>

<style scoped>
  .btn-xs {
    padding: 0.25rem 0.75rem;
    font-size: 1rem;
  }
</style>

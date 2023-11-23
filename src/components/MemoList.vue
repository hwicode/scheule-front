<template>
  <!-- Modal -->
  <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Memo List</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li v-for="(memo, index) in memos" :key="index" class="list-group-item text-break border-primary">
              {{ memo.text }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h4>Memo List</h4>
      <button @click="showAllMemos" class="btn border-secondary border-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="bi bi-list text-secondary"></i>
      </button>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="(memo, index) in visibleMemos" :key="index" class="list-group-item limited-charactor">
        {{ memo.text }}
      </li>  
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MemoList',
  data() {
    return {
      memos: [
        { text: 'ifnsifejsmfkdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjwqndjidsokfmdskfmakdnwqiwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
      ],
      showAll: false,
    };
  },
  computed: {
    visibleMemos() {
      return this.memos.slice(0, 3);
    },
  },
  methods: {
    showAllMemos() {
      this.showAll = true;
    },
  },
};
</script>

<style>
  .limited-charactor {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

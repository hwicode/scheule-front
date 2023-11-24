<template>
  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-center my-5">
        <h4>'{{ tag }}' 태그를 가진 '{{ topic }}' 검색</h4>
      </div>

      <div class="d-flex justify-content-center my-2">
        <table class="table" style="width: 70%;">
          <thead>
            <tr>
              <th class="text-center" style="width: 20%;">Time</th>
              <th class="text-center" style="width: 80%;">{{ content }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in visibleItems" :key="index">
              <td class="text-center">{{ item.time }}</td>
              <td class="text-break">{{ item.text }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <div class="d-flex justify-content-center my-3">
    <button @click="loadMore" v-if="showLoadMoreButton" class="btn btn-primary">
      더 보기
    </button>
  </div>

</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      topic: '메모',
      tag: 'Java',
      items: [
        { text: 'ifnsifejsmfkdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjdsmdkwndjwqndjidsokfmdskfmakdnwqiwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
        { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' }, { text: 'ifnsifejsmfkdsmdkwndjwqndjidsokfmdskfmakdnwqidn' },
      ],
      itemsToShow: 10,
    };
  },
  computed: {
    visibleItems() {
      return this.items.slice(0, this.itemsToShow);
    },
    showLoadMoreButton() {
      return this.visibleItems.length < this.items.length;
    },
    content() {
      return this.topic === '계획표' ? 'Schedule Main Tag' : 'Memo Text';
    },
  },
  methods: {
    loadMore() {
      this.itemsToShow += 10;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 700px) {

  h4 {
    font-size: 4.0vw;
  }

  th{
    font-size: 2.2vw;
  }

  td{
    font-size: 2.2vw;
  }

  .btn {
    font-size: 2.0vw;
  }
  
}
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-center my-5">
        <h4>'{{ tag }}' 태그를 가진 '{{ topic }}' 검색</h4>
      </div>

      <div v-if="this.topic === '계획표'" class="d-flex justify-content-center my-2">
        <table class="table" style="width: 70%;">
          <thead>
            <tr>
              <th class="text-center" style="width: 30%;">Time</th>
              <th class="text-center" style="width: 70%;">Schedule Main Tag</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td @click="goToSchedule(item.yearAndMonthAndDay)" class="text-center" style="cursor: pointer;">{{ item.yearAndMonthAndDay }}</td>
              <td class="text-center">{{ item.mainTagName }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="d-flex justify-content-center my-2">
        <table class="table" style="width: 70%;">
          <thead>
            <tr>
              <th class="text-center">Memo Text</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="text-break" >{{ item.text }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <div class="d-flex justify-content-center my-3">
    <button @click="loadMore" v-if="showButton" class="btn btn-primary">
      더 보기
    </button>
  </div>

</template>

<script>
import { getFirstSchedules, getSchedules, getFirstMemos, getMemos } from '@/api/search.js';

export default {
  name: 'Search',
  data() {
    return {
      topic: '',
      tag: '',
      tagId: undefined,
      items: [],
      showButton: true,
    };
  },
  methods: {
    goToSchedule(date) {
      this.$router.push({
        path: '/schedule',
        query: {
          date: date,
        },
      });
    },

    loadMore() {
      if (this.topic === '계획표') {
        this.fetchSchedules(this.tagId, this.items[this.items.length - 1].id);
      } else {
        this.fetchMemos(this.tagId, this.items[this.items.length - 1].id);
      }
    },

    async fetchFirstSchedules(tagId) {
      try {
        if (tagId === undefined) {
          this.showButton = false;
          return;
        }
        const response = await getFirstSchedules({ tagId });
        this.items.push(...response.data);
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    async fetchSchedules(tagId, lastDailyTagListId) {
      try {
        if (tagId === undefined || lastDailyTagListId === undefined) return;
        const response = await getSchedules({ tagId, lastDailyTagListId });
        this.items.push(...response.data);
        this.checkShowButton(response.data);
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    async fetchFirstMemos(tagId) {
      try {
        if (tagId === undefined) {
          this.showButton = false;
          return;
        }
        const response = await getFirstMemos({ tagId });
        this.items.push(...response.data);
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    async fetchMemos(tagId, lastMemoId) {
      try {
        if (tagId === undefined || lastMemoId === undefined) return;
        const response = await getMemos({ tagId, lastMemoId });
        this.items.push(...response.data);
        this.checkShowButton(response.data);
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    checkShowButton(array) {
      if (array.length === 0) {
        this.showButton = false;
      }
    }
  },
  created() {
    this.topic = this.$route.query.searchTopic;
    this.tag = this.$route.query.tag;
    this.tagId = history.state.tagId;

    if (this.topic === '계획표') {
      this.fetchFirstSchedules(this.tagId);
    } else {
      this.fetchFirstMemos(this.tagId);
    }
  },
};
</script>

<style scoped>
@media screen and (max-width: 700px) {
  .btn {
    font-size: 2.0vw;
  }
  
}
</style>

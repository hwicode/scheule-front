<template>  
  <div class="d-flex justify-content-center mb-4 my-5">
      <button @click="prevDay" class="btn btn-secondary me-4">
        <i class="bi bi-caret-left-fill"></i>
      </button>
      <h2 class="me-4">{{ month }}월 {{ day }}일 {{ year }}년</h2>
      <button v-if="showScheduleNextButton()" @click="nextDay" class="btn btn-secondary">
        <i class="bi bi-caret-right-fill"></i>
      </button>
  </div>

  <div class="container mb-2">
    <div class="row">
      <div class="col">
        <div class="bg-secondary my-4 py-1 text-white">
          <div class="text-end pb-3">
            <span class="mx-2 d-inline-block">총 공부 시간 : {{ Math.floor(totalLearningTime / 60) }}시간 {{ totalLearningTime % 60 }}분</span>
            <span class="mx-2 d-inline-block">총 점수 : {{ totalScore }}</span>
            <span class="mx-2 d-inline-block">성취도 : {{ achievement }}%</span>
            <span class="mx-2 d-inline-block">메인 태그 : {{ mainTag }}</span>
          </div>

          <div class="d-flex justify-content-center pb-2 wrap">
            <div v-for="tag in tags" :key="tag" class="oval-label mx-2">
              <span class="label-text">{{ tag.name }}</span>
            </div>
          </div> 

        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-6 my-3">
        <h4>To Do</h4>
        <ul class="list-group">
          <li v-for="(item, index) in items" :key="index" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold">{{ item.name }}</span>
              <div>
                <div class="oval-label mx-1">
                  <span class="label-text">상태</span>
                </div>
                <div class="oval-label mx-1">
                  <span class="label-text">우선 순위</span>
                </div>
                <div class="oval-label mx-1">
                  <span class="label-text">어려움</span>
                </div>
                <div class="oval-label mx-1">
                  <span class="label-text">중요도</span>
                </div>
              </div>
            </div>
            <ul v-if="item.subTaskQueryResponses" class="list-group mt-2 list-group-flush">
              <li v-for="(subitem, subIndex) in item.subTaskQueryResponses" :key="subIndex" class="list-group-item">
                <span>{{ subitem.name }}</span>
                <div class="oval-label mx-2">
                  <span class="label-text">상태</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="col-md-6 my-3">
        <TimeTable :date="getFormattedDate()" :tasks="tasks" :subTasks="subTasks"/>
      </div>
    </div>
  </div>

  <div class="container py-4 my-4 end-box">
    <div class="row">
      <div class="col-md-4 my-3">
        <MemoList :dailyScheduleId="id"/>
      </div>
      <div class="col-md-8 my-3">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h4>Review</h4>
            {{ this.emoji }}
          </div>
          <div class="card-body">
            <p class="card-text">{{ this.review }}</p>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>

<script>
import TimeTable from "@/components/TimeTable.vue";
import MemoList from "@/components/MemoList.vue";
import { getSchedule, getScheduleTags } from '@/api/schedule.js';

export default {
  name: 'Schedule',
  components: {
    TimeTable : TimeTable,
    MemoList : MemoList,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      id: 0,
      totalScore: 0,
      achievement: 0,
      totalLearningTime: 0,
      emoji: undefined,
      mainTag: '',
      review: '',
      tags: [],
      items: [],
      tasks: new Map(),
      subTasks: new Map(),
    };
  },
  methods: {
    prevDay() {
      const currentDate = new Date(this.year, this.month - 1, this.day);
      currentDate.setDate(currentDate.getDate() - 1);

      this.year = currentDate.getFullYear();
      this.month = currentDate.getMonth() + 1;
      this.day = currentDate.getDate();

      this.routeNewSchedule();
    },

    nextDay() {
      const currentDate = new Date(this.year, this.month - 1, this.day);
      currentDate.setDate(currentDate.getDate() + 1);

      this.year = currentDate.getFullYear();
      this.month = currentDate.getMonth() + 1;
      this.day = currentDate.getDate();

      this.routeNewSchedule();
    },

    routeNewSchedule() {
      this.$router.push({
        path: '/schedule',
        query: {
          date: this.getFormattedDate(),
        },
      });
    },

    showScheduleNextButton() {
      if (this.year === new Date().getFullYear() && this.month === new Date().getMonth() + 1 && this.day === new Date().getDate()) {
        return false;
      }
      return true;
    },

    async fetchSchedule() {
      const date = this.getFormattedDate();
      try {
        const response = await getSchedule({ date });
        this.mappingData(response.data);
      } catch (error) {
        this.handleFetchError(error);
      }
    },

    handleFetchError(error) {
      if (error.response && error.response.data.message === '계획표가 존재하지 않습니다.') {
        return;
      } else {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    mappingData(data) {
      this.id = data.id;
      this.totalScore = data.totalDifficultyScore;
      this.achievement = data.todayDonePercent;
      this.totalLearningTime = data.totalLearningTime;
      this.emoji = data.emoji,
      this.mainTag = data.mainTagName;
      this.review = data.review;
      this.items = data.taskQueryResponses;
      this.initializeTasksAndSubTasks();
    },

    initializeTasksAndSubTasks() {
      this.tasks = new Map(this.items.map(task => [task.id, task.name]));

      const subItems = [];
      this.items.forEach((item) => {
        if (item.subTaskQueryResponses) {
          subItems.push(...item.subTaskQueryResponses)
        }
      });
      this.subTasks = new Map(subItems.map(subTask => [subTask.id, subTask.name]));
    },

    async fetchScheduleTags() {
      const date = this.getFormattedDate();
      try {
        const response = await getScheduleTags({ date });
        this.tags = response.data;
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    getFormattedDate() {
      return `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
    },
  },
  created() {
    const date = new Date(this.$route.query.date);
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();

    this.fetchSchedule();
    this.fetchScheduleTags();
  }
}
</script>

<style scoped>
.btn {
  --bs-btn-font-size: 1.25vw;
}

.d-flex.wrap {
  flex-wrap: wrap;
  gap: 10px;
}

.end-box {
  background-color: #787878;
  border-radius: 10px;
}

@media screen and (max-width: 700px) {
  span {
    font-size: 2.2vw;
  }

  p {
    font-size: 2.2vw;
  }

  .label-text {
    font-size: 1.5vw;
  }
}
</style>

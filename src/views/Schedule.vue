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

  <div class="container bg-secondary text-white mb-2">
    <div class="row mb-4">
      <div class="col">
        <div class="text-end">
          <span class="mx-2 d-inline-block">총 공부 시간 : {{ Math.floor(totalLearningTime / 60) }}시간 {{ totalLearningTime % 60 }}분</span>
          <span class="mx-2 d-inline-block">총 점수 : {{ totalScore }}</span>
          <span class="mx-2 d-inline-block">성취도 : {{ achievement }}%</span>
          <span class="mx-2 d-inline-block">메인 태그 : {{ mainTag }}</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">    
          <div class="d-flex justify-content-center my-2 wrap">
            <div v-for="tag in tags" :key="tag" class="oval-label mx-2">
              <span class="label-text">{{ tag.name }}</span>
            </div>
          </div> 
      </div>
    </div>

  </div>

  <div class="container">
    <div class="row">
      <div class="d-flex justify-content-end wrap">
        <button type="button" class="btn btn-outline-primary btn-sm">전체 태그</button>
        <button @click="showAllReviewCycles()" type="button" class="btn btn-outline-primary btn-sm">전체 복습 주기</button>
      </div>
    </div>

    <div v-if="isShowAllReviewCycles" class="d-flex justify-content-end my-3">
      <div class="list-group" style="width: 50%;">
        <div v-for="(reviewCycle, index) in reviewCycles" :key="index">
          <button type="button" data-bs-toggle="dropdown" class="list-group-item list-group-item-action">
            <div class="fw-bold">{{ reviewCycle.name }}</div>
            <div>{{ reviewCycle.reviewCycleDates }}</div>
          </button>
          <ul class="dropdown-menu">
            <li @click="showReviewCycleChangeForm(reviewCycle)" class="dropdown-item" style="cursor: pointer;">복습 주기 이름 변경</li>
            <li @click="showReviewCyclePeriodForm(reviewCycle)" class="dropdown-item" style="cursor: pointer;">복습 주기 기간 변경</li>
            <li @click="showReviewCycleDeleteForm(reviewCycle)" class="dropdown-item" style="cursor: pointer;">복습 주기 삭제</li>
          </ul>

          <div v-if="reviewCycle.showReviewCycleChangeForm" class="border px-1 py-1">
            <form @submit.prevent="changeReviewCycleName(reviewCycle)">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <label class="form-label">복습 주기 이름 변경</label>
                <button @click="reviewCycle.showReviewCycleChangeForm = !reviewCycle.showReviewCycleChangeForm;" type="button" class="btn-close"></button>
              </div>
              <div class="input-group">
                <input v-model="newReviewCycleName" type="text" class="form-control" placeholder="새로운 이름을 입력하세요" required>
                <button type="submit" class="btn btn-secondary form-btn">변경</button>
              </div>
            </form>
            <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
          </div>

          <div v-if="reviewCycle.showReviewCycleDeleteForm" class="border px-1 py-1">
            <form @submit.prevent="deleteReviewCycle(reviewCycle)">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <label class="form-label">복습 주기 삭제</label>
                <button @click="reviewCycle.showReviewCycleDeleteForm = !reviewCycle.showReviewCycleDeleteForm;" type="button" class="btn-close"></button>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-secondary form-btn">삭제</button>
              </div>
            </form>
            <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
          </div>

          <div v-if="reviewCycle.showReviewCyclePeriodForm" class="border px-1 py-1">
            <form @submit.prevent="changeReviewCyclePeriod(reviewCycle)">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <label class="form-label">복습 주기 기간 변경</label>
                <button @click="reviewCycle.showReviewCyclePeriodForm = !reviewCycle.showReviewCyclePeriodForm;" type="button" class="btn-close"></button>
              </div>
              <label class="form-label fw-bold">새로운 복습 주기 : {{ [...cycleNumbers].sort() }}</label>
              <div class="input-group mb-3">
                <input v-model.number="newCycleNumber" class="form-control" placeholder="새로운 복습 주기에 기간(일)을 추가하세요">
                <button @click="addNumber()" type="button" class="btn btn-secondary">추가</button>
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary form-btn">저장</button>
              </div>
            </form>
            <AlertWarning @turnOff="isNotValidNumberAlert = $event" message="복습 주기 기간은 1과 60사이의 숫자만 가능합니다." :isVisible="isNotValidNumberAlert"/>
          <AlertWarning @turnOff="isNotValidReviewCycleAlert = $event" message="복습 주기가 존재해야 합니다." :isVisible="isNotValidReviewCycleAlert"/>
            <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
          </div>

        </div>

        <button @click="showReviewCycleCreateForm()" type="button" class="list-group-item list-group-item-action d-flex">
            <i class="bi bi-plus-circle-dotted"></i>
            <div class="fw-bold mx-1">복습 주기 추가</div>
        </button>

        <div v-if="isShowReviewCycleForm" class="border px-2 py-2">
          <form @submit.prevent="addReviewCycle">
            <div class="mb-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <label class="form-label fw-bold">복습 주기 이름</label>
                <button @click="isShowReviewCycleForm = !isShowReviewCycleForm;" type="button" class="btn-close"></button>
              </div>
              <input v-model="newReviewCycleName" type="text" class="form-control" placeholder="새로운 복습 주기의 이름을 입력하세요" required>
            </div>
            <label class="form-label fw-bold">복습 주기 : {{ [...cycleNumbers].sort() }}</label>
            <div class="input-group mb-3">
              <input v-model.number="newCycleNumber" class="form-control" placeholder="기간을 추가하세요">
              <button @click="addNumber()" type="button" class="btn btn-secondary">추가</button>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary form-btn">저장</button>
            </div>
          </form>
          <AlertWarning @turnOff="isNotValidNumberAlert = $event" message="복습 주기 기간은 1과 60사이의 숫자만 가능합니다." :isVisible="isNotValidNumberAlert"/>
          <AlertWarning @turnOff="isNotValidReviewCycleAlert = $event" message="복습 주기가 존재해야 합니다." :isVisible="isNotValidReviewCycleAlert"/>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-6 my-3">
        <Tasks @addTask="addTask" @deleteTask="deleteTask" @addSubTask="addSubTask" :dailyScheduleId="id" :date="getFormattedDate()" :items="items"/>
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
import Tasks from "@/components/Tasks.vue";
import TimeTable from "@/components/TimeTable.vue";
import MemoList from "@/components/MemoList.vue";

import AlertWarning from "@/components/basic/AlertWarning.vue";
import AlertServerError from "@/components/basic/AlertServerError.vue";

import { 
  getSchedule, getScheduleTags, saveSchedule, getReviewCyclesApi, 
  saveReviewCycleApi, changeReviewCycleNameApi, changeReviewCyclePeriodApi, deleteReviewCycleApi
} from '@/api/schedule.js';

export default {
  name: 'Schedule',
  components: {
    Tasks: Tasks,
    TimeTable : TimeTable,
    MemoList : MemoList,
    AlertWarning: AlertWarning,
    AlertServerError: AlertServerError,
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

      items: [],
      tasks: new Map(),
      subTasks: new Map(),
      tags: [],
      reviewCycles: [],

      newReviewCycleName: '',
      cycleNumbers: new Set(),
      newCycleNumber: 0,

      isShowAllReviewCycles: false,
      isShowReviewCycleForm: false,

      isServerErrorAlert: false,
      isNotValidNumberAlert: false,
      isNotValidReviewCycleAlert: false,
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

    showAllReviewCycles() {
      this.isShowAllReviewCycles = !this.isShowAllReviewCycles;
    },

    showReviewCycleCreateForm() {
      this.isShowReviewCycleForm = !this.isShowReviewCycleForm;
      this.newReviewCycleName = '';
      this.cycleNumbers = new Set();
    },

    showReviewCycleChangeForm(reviewcycle) {
      this.closeAllReviewCycleChangeForm();
      reviewcycle.showReviewCycleChangeForm = !reviewcycle.showReviewCycleChangeForm;
      this.newReviewCycleName = '';
    },

    closeAllReviewCycleChangeForm() {
      this.reviewCycles.forEach(reviewCycle => reviewCycle.showReviewCycleChangeForm = false);
    },

    showReviewCyclePeriodForm(reviewcycle) {
      this.closeAllReviewCyclePeriodForm();
      reviewcycle.showReviewCyclePeriodForm = !reviewcycle.showReviewCyclePeriodForm;
      this.cycleNumbers = new Set();
    },

    closeAllReviewCyclePeriodForm() {
      this.reviewCycles.forEach(reviewCycle => reviewCycle.showReviewCyclePeriodForm = false);
    },

    showReviewCycleDeleteForm(reviewcycle) {
      this.closeAllReviewCycleDeleteForm();
      reviewcycle.showReviewCycleDeleteForm = !reviewcycle.showReviewCycleDeleteForm;
    },

    closeAllReviewCycleDeleteForm() {
      this.reviewCycles.forEach(reviewCycle => reviewCycle.showReviewCycleDeleteForm = false);
    },

    addNumber() {
      if (!Number.isInteger(this.newCycleNumber) || this.newCycleNumber <= 0 || this.newCycleNumber > 60) {
        this.isNotValidNumberAlert = true;
        return;
      }
      this.cycleNumbers.add(this.newCycleNumber);
      this.newCycleNumber = 0;
    },

    addTask(task) {
      task = this.initializeTask(task);
      this.items.push(task);
      this.initializeTasksAndSubTasks();
    },

    deleteTask(task) {
      this.items = this.items.filter(item => item.id !== task.id);
    },

    addSubTask(task, subTask) {
      subTask = this.initializeSubTask(subTask);
      task.subTaskQueryResponses.push(subTask);
      this.initializeTasksAndSubTasks();
    },
    
    async fetchSchedule() {
      const date = this.getFormattedDate();
      try {
        const response = await getSchedule({ date });
        this.mappingData(response.data);
      } catch (error) {
        this.handleFetchError(error, date);
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
      this.initializeItems(data.taskQueryResponses);
      this.initializeTasksAndSubTasks();
    },

    initializeItems(taskResponses) {
      this.items = taskResponses.map(item => {
        return this.initializeTask(item);
      });
    },

    initializeTask(item) {
      const task = {
        ...item,
        showTaskChangeForm: false,
        showTaskDeleteForm: false,
        showTaskStatusForm: false,
        showTaskImportanceForm: false,
        showTaskPriorityForm: false,
        showTaskDifficultyForm: false,
        showTaskReviewForm: false,
        showTaskReviewCancelForm: false,
        showSubTaskCreateForm: false,
      };

      if (item.subTaskQueryResponses) {
        task.subTaskQueryResponses = item.subTaskQueryResponses.map(subTask => this.initializeSubTask(subTask))
      } else {
        task.subTaskQueryResponses = [];
      }
      return task;
    },

    initializeSubTask(subTask) {
      return {
        ...subTask,
        showSubTaskChangeForm: false,
        showSubTaskStatusForm: false,
        showSubTaskDeleteForm: false,
      }
    },

    initializeTasksAndSubTasks() {
      this.tasks = new Map(this.items.map(task => [task.id, task.name]));

      const subItems = [];
      this.items.forEach((item) => {
        subItems.push(...item.subTaskQueryResponses)
      });
      this.subTasks = new Map(subItems.map(subTask => [subTask.id, subTask.name]));
    },

    handleFetchError(error, date) {
      if (error.response && error.response.data.message === '계획표가 존재하지 않습니다.') {
        return this.provideSchedule(date);
      }
      console.log(`오류가 발생했습니다: ${error}`);
    },

    async provideSchedule (date) {
      if (this.year === new Date().getFullYear() && this.month === new Date().getMonth() + 1 && this.day === new Date().getDate()) {
        await saveSchedule(date);
        this.$router.push({
          path: '/schedule',
          query: {
            date: this.getFormattedDate(date),
          },
        });
      }
    },

    async fetchScheduleTags() {
      const date = this.getFormattedDate();
      try {
        const response = await getScheduleTags({ date });
        this.tags = response.data;
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error}`);
      }
    },

    getFormattedDate() {
      return `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
    },

    async fetchReviewCycles() {
      try {
        const response = await getReviewCyclesApi();
        this.initializeReviewCycles(response.data);
      } catch (error) {
        this.handleServerError(error);
      }
    },

    initializeReviewCycles(reviewCycles) {
      this.reviewCycles = reviewCycles.map(reviewCycle => {
        return this.initializeReviewCycle(reviewCycle);
      })
    },

    initializeReviewCycle(reviewCycle) {
      return {
          ...reviewCycle,
          showReviewCycleChangeForm: false,
          showReviewCyclePeriodForm: false,
          showReviewCycleDeleteForm: false,
      };
    },

    async addReviewCycle() {
      if (this.cycleNumbers.size === 0) {
        this.isNotValidReviewCycleAlert = true;
        return;
      }
      try {
        const response = await saveReviewCycleApi( 
          {
            reviewCycleName: this.newReviewCycleName,
            cycle: [...this.cycleNumbers].sort()
          } 
        );
        this.isShowReviewCycleForm = false;
        const newReviewCycle = {
          id: response.data.reviewCycleId,
          name: response.data.reviewCycleName,
          reviewCycleDates: response.data.cycle
        }
        this.reviewCycles.push(this.initializeReviewCycle(newReviewCycle));
        console.log(this.reviewCycles)
      } catch (error) {
        this.handleServerError(error);
      }
    },

    handleServerError(error) {
      this.isServerErrorAlert = true;
      console.log(`오류가 발생했습니다: ${error}`);
    },

    async changeReviewCycleName(reviewCycle) {
      try {
        const response = await changeReviewCycleNameApi( {
          reviewCycleId: reviewCycle.id,
          newReviewCycleName: this.newReviewCycleName
        });
        reviewCycle.name = response.data.newReviewCycleName;
        reviewCycle.showReviewCycleChangeForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async changeReviewCyclePeriod(reviewCycle) {
      if (this.cycleNumbers.size === 0) {
        this.isNotValidReviewCycleAlert = true;
        return;
      }
      try {
        const response = await changeReviewCyclePeriodApi( {
          reviewCycleId: reviewCycle.id,
          cycle: [...this.cycleNumbers].sort()
        });
        reviewCycle.reviewCycleDates = response.data.cycle;
        reviewCycle.showReviewCyclePeriodForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async deleteReviewCycle(reviewCycle) {
      try {
        await deleteReviewCycleApi(reviewCycle.id);
        this.reviewCycles = this.reviewCycles.filter(item => item.id !== reviewCycle.id);
        reviewCycle.showReviewCycleDeleteForm = false;
      } catch (error) {
        this.handleServerError(error);
        return;
      }
    },

  },
  created() {
    const date = new Date(this.$route.query.date);
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();

    this.fetchSchedule();
    this.fetchScheduleTags();
    this.fetchReviewCycles();
  }
}
</script>

<style scoped>
.d-flex.wrap {
  flex-wrap: wrap;
  gap: 10px;
}

.end-box {
  background-color: #787878;
  border-radius: 10px;
}

@media screen and (max-width: 700px) {
  .btn {
    font-size: 2vw;
  }

  span {
    font-size: 2.2vw;
  }

  p {
    font-size: 2.2vw;
  }

  .form-label {
    font-size: 2.0vw;
  }

  .form-control {
    font-size: 1.75vw;
  }

  .form-btn {
    font-size: 1.25vw;
    padding: 2px 4px;
  }

  .label-text {
    font-size: 1.25vw;
  }
}
</style>

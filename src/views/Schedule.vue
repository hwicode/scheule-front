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
          <span @click="this.isShowMainTagForm = !this.isShowMainTagForm" class="mx-2 d-inline-block name-hover">메인 태그 : {{ mainTag }}</span>
        </div>
      </div>
    </div>

    <div v-if="isShowMainTagForm" class="border px-1 py-1 my-2" style="background-color: white;">
      <form @submit.prevent="changeMainTag()">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <label class="form-label fw-bold" style="color: black;">계획표에 메인 태그 변경</label>
          <button  @click="isShowMainTagForm = !isShowMainTagForm;" type="button" class="btn-close"></button>
        </div>
        <div class="input-group mb-1">
          <select @change="selectedMainTag = $event.target.value" class="form-select">
            <option v-for="(tag, index) in tags" :key="index" class="form-control">{{ tag.name }}</option>
          </select>
          <button type="submit" class="btn btn-secondary form-btn">확인</button>
        </div>
      </form>
      <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
    </div>

    <div class="row">
      <div class="col">    

        <div class="d-flex justify-content-center my-2 wrap">
          <div v-for="tag in tags" :key="tag" >
            <div class="oval-label name-hover mx-2" data-bs-toggle="dropdown">
              <span class="label-text">{{ tag.name }}</span>
            </div>
            <ul class="dropdown-menu">
              <li @click="showTagDeleteForm(tag)" class="dropdown-item" style="cursor: pointer;">계획표의 태그 삭제</li>
            </ul>
          </div>
        </div>
        
        <div v-if="this.isShowTagDeleteForm" class="border px-1 py-1 my-2" style="background-color: white;">
          <form @submit.prevent="deleteDailyTag()">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <label class="form-label fw-bold" style="color: black">계획표에 태그를 삭제할까요?</label>
              <button @click="this.isShowTagDeleteForm = !this.isShowTagDeleteForm;" type="button" class="btn-close"></button>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-secondary form-btn">확인</button>
            </div>
          </form>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        <div class="d-flex justify-content-center">
          <button @click="isShowTagAddForm = !isShowTagAddForm" class="btn px-1">
            <i class="bi bi-plus-circle-dotted fs-5" style="color: rgb(229, 214, 214);"></i>
          </button>  
        </div>

        <div v-if="isShowTagAddForm" class="border px-1 py-1 my-2" style="background-color: white;">
          <form @submit.prevent="addTagToSchedule()">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <label class="form-label fw-bold" style="color: black;">계획표에 태그 추가</label>
              <button  @click="isShowTagAddForm = !isShowTagAddForm;" type="button" class="btn-close"></button>
            </div>
            <div class="input-group mb-1">
              <select @change="selectedTag = $event.target.value" class="form-select">
                <option v-for="(tag, index) in tagMap" :key="index" class="form-control">{{ tag[0] }}</option>
              </select>
              <button type="submit" class="btn btn-secondary form-btn">추가</button>
            </div>
          </form>
          <AlertWarning @turnOff="isDailyTagDuplicatedAlert = $event" message="계획표에 태그가 중복되었습니다." :isVisible="isDailyTagDuplicatedAlert"/>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
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
        <TimeTable :date="getFormattedDate()" :dailyScheduleId="id" :tasks="tasks" :subTasks="subTasks"/>
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
            <h4 @click="isShowReviewForm = !isShowReviewForm" class="name-hover">Review</h4>
            <div @click="isShowEmojiForm = !isShowEmojiForm" style="cursor: pointer;">{{ emojiMap.get(emoji) }}</div>
          </div>
          <div class="card-body">
            <p class="card-text">{{ this.review }}</p>
          </div>
        </div>

        <div v-if="isShowEmojiForm" class="border px-1 py-1" style="background-color: white; width: 50%;">
          <form @submit.prevent="changeEmoji()">
            <div class="d-flex justify-content-between mb-2">
              <label class="form-label fw-bold">이모지 변경</label>
              <button @click="isShowEmojiForm = !isShowEmojiForm" type="button" class="btn-close"></button>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <div class="form-check form-check-inline mx-2">
                  <input v-model="selectedEmoji" value="GOOD" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    {{ emojiMap.get('GOOD') }}
                  </label>
                </div>
                <div class="form-check form-check-inline mx-2">
                  <input v-model="selectedEmoji" value="NOT_BAD" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                  <label class="form-check-label" for="flexRadioDefault2">
                    {{ emojiMap.get('NOT_BAD') }}
                  </label>
                </div>
                <div class="form-check form-check-inline mx-2">
                  <input v-model="selectedEmoji" value="BAD" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                  <label class="form-check-label" for="flexRadioDefault3">
                    {{ emojiMap.get('BAD') }}
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary form-btn">변경</button>
            </div>
          </form>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        <div v-if="isShowReviewForm" class="border px-1 py-1" style="background-color: white;">
          <form @submit.prevent="changeReview()">
            <div class="d-flex justify-content-between mb-1">
              <label class="form-label fw-bold">오늘의 회고!</label>
              <button @click="isShowReviewForm = !isShowReviewForm" type="button" class="btn-close"></button>
            </div>
            <textarea v-model="newReview" class="form-control mb-3" rows="4"></textarea>
            <div class="text-center">
              <button type="submit" class="btn btn-secondary form-btn">확인</button>
            </div>
          </form>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
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
  saveReviewCycleApi, changeReviewCycleNameApi, changeReviewCyclePeriodApi, deleteReviewCycleApi,
  changeEmojiAndReviewApi, addTagToScheduleApi, deleteTagToScheduleApi, changeMainTagApi
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
      newReview: '',

      selectedEmoji: undefined,
      selectedTag: null,
      selectedDailyTag: null,
      selectedMainTag: null,

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
      isShowEmojiForm: false,
      isShowReviewForm: false,
      isShowTagAddForm: false,
      isShowTagDeleteForm: false,
      isShowMainTagForm: false,

      isServerErrorAlert: false,
      isNotValidNumberAlert: false,
      isNotValidReviewCycleAlert: false,
      isDailyTagDuplicatedAlert: false,
    };
  },
  computed: {
    tagMap() {
      return this.$store.state.tags.tags;
    },

    emojiMap() {
      return this.$store.state.emojis.emojis;
    }
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

    showTagDeleteForm(tag) {
      this.selectedDailyTag = tag.name;
      this.isShowTagDeleteForm = !this.isShowTagDeleteForm;
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

    async addTagToSchedule() {
      if (!this.selectedTag) {
        this.selectedTag = this.tagMap.keys().next().value;
      }
      try {
        const response = await addTagToScheduleApi( {
          dailyTagListId: this.id,
          tagId: this.tagMap.get(this.selectedTag),
        });
        this.tags.push({
          id: response.data.tagId,
          name: this.selectedTag
        });
        this.selectedTag = null;
        this.isShowTagAddForm = false;
      } catch (error) {
        if (error.response && error.response.data.message === '계획표에 태그가 중복되었습니다.') {
          this.isDailyTagDuplicatedAlert = true;
          return;
        }
        this.handleServerError(error);
      }
    },

    async deleteDailyTag() {
      try {
        await deleteTagToScheduleApi( {
          dailyTagListId: this.id,
          tagId: this.tagMap.get(this.selectedDailyTag),
        });
        this.tags = this.tags.filter(tag => tag.id !== this.tagMap.get(this.selectedDailyTag));
        this.isShowTagDeleteForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async changeMainTag() {
      if (!this.selectedMainTag) {
        this.selectedMainTag = this.tags[0].name;
      }
      try {
        const response = await changeMainTagApi( {
          dailyTagListId: this.id,
          tagId: this.tags.find(tag => tag.name === this.selectedMainTag).id,
        });
        this.mainTag = response.data.mainTagName;
        this.selectedMainTag = null;
        this.isShowMainTagForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
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

    async changeEmoji() {
      try {
        const response = await changeEmojiAndReviewApi( {
          dailyToDoListId: this.id,
          review: this.review,
          emoji: this.selectedEmoji
        });
        this.emoji = response.data.modifiedEmoji;
        this.isShowEmojiForm = false;
      } catch (error) {
        this.handleServerError(error);
        return;
      }
    },
    
    async changeReview() {
      try {
        const response = await changeEmojiAndReviewApi( {
          dailyToDoListId: this.id,
          review: this.newReview,
          emoji: this.emoji
        });
        this.review = response.data.modifiedReview;
        this.isShowReviewForm = false;
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

  .btn-close {
    font-size: 2.5vw;
  }

  span {
    font-size: 2.2vw;
  }

  p {
    font-size: 2.2vw;
  }

  .form-label {
    font-size: 3.0vw;
  }

  .form-control {
    font-size: 2.75vw;
  }

  .form-btn {
    font-size: 1.25vw;
    padding: 2px 4px;
  }

  .form-check {
    font-size: 2.0vw;
    min-height: 0;
  }

  .label-text {
    font-size: 1.25vw;
  }

  .form-btn {
    font-size: 1.25vw;
    padding: 2px 4px;
  }

  .form-select {
    font-size: 2.75vw;
  }
}
</style>

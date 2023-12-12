<template>
  <div>
    <div class="d-flex align-items-center">
      <h4>Study Time Table</h4>
      <button @click="showLearningTimeForm = !showLearningTimeForm" class="btn px-1">
        <i class="bi bi-plus fs-4"></i>
      </button>  
    </div>

    <div v-if="showLearningTimeForm" class="border px-1 py-1" style="width: 80%;">
      <form @submit.prevent="addLearningTime()">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <label class="form-label">학습 시간을 추가하시나요?</label>
          <button @click="showLearningTimeForm = !showLearningTimeForm;" type="button" class="btn-close"></button>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-secondary form-btn">확인</button>
        </div>
      </form>
      <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th style="width: 25%;">Time</th>
          <th style="width: 15%;" class="text-center">Duration</th>
          <th style="width: 60%;" class="text-center">Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(studySession, index) in studySessions" :key="index">
          <td class="name-hover">{{ formatTime(studySession.startTime) }} ~ {{ formatTime(studySession.endTime) }}</td>
          <td class="text-center">{{ formatDuration(calculateLearningTime(index)) }}</td>
          <td v-if="studySession.taskId" class="text-center name-hover">{{ tasks.get(studySession.taskId) }}</td>
          <td v-else-if="studySession.subTaskId" class="text-center name-hover">{{ subTasks.get(studySession.subTaskId) }}</td>
          <td v-else class="text-center name-hover">{{ formatSubject(studySession.subject) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getLearningTimes, saveLearningTimeApi } from '@/api/time-table.js';
import AlertServerError from "@/components/basic/AlertServerError.vue";

export default {
  name: 'TimeTable',
  components: {
    AlertServerError: AlertServerError,
  },
  props: {
    date: String,
    dailyScheduleId: Number,
    tasks: Map,
    subTasks: Map,
  },
  data() {
    return {
      studySessions: [],
      isServerErrorAlert: false,
      showLearningTimeForm: false,
    };
  },
  methods: {
    calculateLearningTime(index) {
      const session = this.studySessions[index];
      const start = new Date(session.startTime);
      const end = new Date(session.endTime);
      if (!Number.isInteger(start) || !Number.isInteger(end) || end - start < 0) return;
      return Math.floor((end - start) / (1000 * 60));
    },

    formatTime(dateTime) {
      if (!dateTime) return; 
      return dateTime.split('T')[1].substring(0, 5);
    },

    formatDuration(minutes) {
      if (!minutes) return '0h 0m';
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    },

    formatSubject(subject) {
      if (!subject) {
        return '없음';
      }
      return subject
    },

    async fetchLearningTimes() {
      const date = this.date;
      try {
        const response = await getLearningTimes({ date });
        this.studySessions = response.data.sort((a, b) => a.startTime.localeCompare(b.startTime));
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    async addLearningTime() {
      try {
        this.studySessions.map(session => {
          if (!session.endTime) {
            session.endTime = this.getStartTime();
          }
        })
        const response = await saveLearningTimeApi( 
          {
            timeTableId: this.dailyScheduleId,
            startTime: this.getStartTime()
          } 
        );
        const newLearningTime = {
          id: response.data.learningTimeId,
          startTime: response.data.startTime,
          endTime: null,
          subject: '',
          taskId: 0,
          subTaskId: 0
        }
        this.studySessions.push(newLearningTime);
        this.showLearningTimeForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    getStartTime() {
      const now = new Date();
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate()}`
      + `T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`
    },

    handleServerError(error) {
      this.isServerErrorAlert = true;
      console.log(`오류가 발생했습니다: ${error}`);
    },
  
  },
  created() {
    this.fetchLearningTimes();
  },
};
</script>

<style scoped>
@media screen and (max-width: 700px) { 
  .form-label {
    font-size: 2.5vw;
  }

  .form-btn {
    font-size: 2.0vw;
    padding: 2px 4px;
  }

  .btn-close {
    font-size: 2.5vw;
  }

}
</style>
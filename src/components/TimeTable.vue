<template>
  <div>
    <div class="d-flex align-items-center">
      <h4>Study Time Table</h4>
      <button @click="addLearningTime()" class="btn px-1">
        <i class="bi bi-plus fs-4"></i>
      </button>  
    </div>
    <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
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
          <td v-if="studySession.taskId" class="text-center">{{ tasks.get(studySession.taskId) }}</td>
          <td v-else-if="studySession.subTaskId" class="text-center">{{ subTasks.get(studySession.subTaskId) }}</td>
          <td v-else class="text-center">{{ studySession.subject }}</td>
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
</style>
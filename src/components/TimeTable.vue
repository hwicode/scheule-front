<template>
  <div>
    <h4>Study Time Table</h4>
    <table class="table">
      <thead>
        <tr>
          <th style="width: 40%;">Time</th>
          <th style="width: 10%;" class="text-center">Duration</th>
          <th style="width: 50%;" class="text-center">Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(studySession, index) in studySessions" :key="index">
          <td>{{ formatTime(studySession.startTime) }} ~ {{ formatTime(studySession.endTime) }}</td>
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
import { getLearningTimes } from '@/api/time-table.js';

export default {
  name: 'TimeTable',
  props: {
    date: String,
    tasks: Map,
    subTasks: Map,
  },
  data() {
    return {
      studySessions: [],
    };
  },
  methods: {
    calculateLearningTime(index) {
      const session = this.studySessions[index];
      const start = new Date(session.startTime);
      const end = new Date(session.endTime);

      return Math.floor((end - start) / (1000 * 60));
    },

    formatTime(dateTime) {
      return dateTime.split('T')[1];
    },

    formatDuration(minutes) {
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
  
  },
  created() {
    this.fetchLearningTimes();
  },
};
</script>

<style scoped>
</style>
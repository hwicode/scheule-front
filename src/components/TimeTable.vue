<template>
  <div>
    <h4>Study Time Table</h4>
    <table class="table">
      <thead>
        <tr>
          <th style="width: 20%;">Time</th>
          <th style="width: 10%;" class="text-center">Duration</th>
          <th style="width: 60%;" class="text-center">Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(studySession, index) in studySessions" :key="index">
          <td>{{ formatTime(studySession.start) }} ~ {{ formatTime(studySession.end) }}</td>
          <td class="text-center">{{ formatDuration(calculateLearningTime(index)) }}</td>
          <td class="text-center">{{ studySession.activity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TimeTable',
  data() {
    return {
      studySessions: [
        { start: '2023-11-13T08:00', end: '2023-11-13T10:20', activity: 'Study Math' },
        { start: '2023-11-13T13:00', end: '2023-11-13T15:13', activity: 'Study Science' },
        { start: '2023-11-13T16:03', end: '2023-11-13T16:13', activity: 'Study Java' },
      ],
    };
  },
  methods: {
    calculateLearningTime(index) {
      const session = this.studySessions[index];
      const start = new Date(session.start);
      const end = new Date(session.end);

      // Calculate the duration in minutes
      return (end - start) / (1000 * 60);
    },
    formatTime(dateTime) {
      return dateTime.split('T')[1];
    },
    formatDuration(minutes) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    },
  },
};
</script>

<style scoped>
</style>
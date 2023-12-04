<template>
  <div class="my-5">
    <div class="d-flex justify-content-center mb-4">
        <button @click="prevMonth" class="btn btn-secondary me-4">
          <i class="bi bi-caret-left-fill"></i>
        </button>
        <h2 class="me-4">{{ month }}월 {{ year }}년</h2>
        <button v-if="showCalendarNextButton()" @click="nextMonth" class="btn btn-secondary">
          <i class="bi bi-caret-right-fill"></i>
        </button>
    </div>
    
    <Goals @addGoal="addGoal" :goals="goals"/>
    <CalendarSchedule :year="year" :month="month" />
  </div>
</template>

<script>
import Goals from "@/components/Goals.vue";
import CalendarSchedule from "@/components/CalendarSchedule.vue";
import { getCalendarAndGoals, saveCalendar } from '@/api/calendar.js';

export default {
  name: 'Calendar',
  components: {
    Goals : Goals,
    CalendarSchedule : CalendarSchedule,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      goals: [],
    };
  },
  methods: {
    prevMonth() {
      this.month -= 1;
      if (this.month < 1) {
        this.month = 12;
        this.year -= 1;
      }
      this.fetchCalendarAndGoals();
    },

    nextMonth() {
      this.month += 1;
      if (this.month > 12) {
        this.month = 1;
        this.year += 1;
      }
      this.fetchCalendarAndGoals();
    },

    showCalendarNextButton() {
      if (this.year === new Date().getFullYear() && this.month === new Date().getMonth() + 1) {
        return false;
      }
      return true;
    },

    addGoal(goal) {
      this.goals.push(goal);
    },
    
    async fetchCalendarAndGoals() {
      const yearMonth = this.getFormattedYearMonth();
      try {
        const response = await getCalendarAndGoals({ yearMonth });
        this.goals = response.data.goalResponses;
      } catch (error) {
        this.handleFetchError(error, yearMonth);
      }
    },

    getFormattedYearMonth() {
      return `${this.year}-${this.month.toString().padStart(2, '0')}`;
    },

    handleFetchError(error, yearMonth) {
      if (error.response && error.response.data.message === '캘린더를 찾을 수 없습니다.') {
        return this.provideCalendar(yearMonth);
      }
      console.log(`오류가 발생했습니다: ${error.message}`);
    },

    provideCalendar(yearMonth) {
      if (this.year === new Date().getFullYear() && this.month === new Date().getMonth() + 1) {
        saveCalendar(yearMonth);
      }
    }
  },
  created() {
    this.fetchCalendarAndGoals();
  }
}

</script>

<style scoped>

 @media screen and (max-width: 700px) { 
  .btn {
    font-size: 2.0vw;
    padding: 1px 8px;
  }
 }

</style>
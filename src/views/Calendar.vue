<template>
  <div class="my-5">
    <div class="d-flex justify-content-center mb-4">
        <button @click="prevMonth" class="btn btn-secondary me-4">
          <i class="bi bi-caret-left-fill"></i>
        </button>
        <h2 class="me-4">{{ month }}월 {{ year }}년</h2>
        <button @click="nextMonth" class="btn btn-secondary">
          <i class="bi bi-caret-right-fill"></i>
        </button>
    </div>
    
    <Goals :goals="goals"/>
    <CalendarSchedule :year="year" :month="month" />
  </div>
</template>

<script>
import Goals from "@/components/Goals.vue";
import CalendarSchedule from "@/components/CalendarSchedule.vue";
import { getCalendarAndGoals } from '@/api/calendar.js';

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
    fetchCalendarAndGoals() {
      const yearMonth = `${this.year}-${this.month.toString().padStart(2, '0')}`;
      getCalendarAndGoals({ yearMonth: yearMonth },
        response => {
          this.goals = response.data.goalResponses;
        },
        error => {
          if (error.response.data.message == '캘린더를 찾을 수 없습니다.') {
            this.goals = [];
          } else {
            console.log(`오류가 발생했습니다: ${error.message}`);
          }
        }
      );
    },
  },
  mounted() {
    this.fetchCalendarAndGoals();
  }
}

</script>

<style scoped>
.btn {
  --bs-btn-font-size: 1.25vw;
}
</style>
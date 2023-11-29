<template>
    <div class="d-flex justify-content-center">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th v-for="(day, index) in daysOfWeek" :key="index" :class="dayClasses(index)" class="day">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar" :key="week">
            <td v-for="(day, index) in week" :key="index" @click="selectDate(day)" style="cursor: pointer;" width="100 / 7">
              <div v-if="day.date">
                <div class="d-flex justify-content-between align-items-center">
                  <div :class="dayClasses(index)" class="day">
                    {{ day.day }}
                  </div>
                  <div v-if="day.schedule">{{ day.schedule.emoji }}</div>
                </div>
                <div class="content">
                  <div v-if="day.schedule">총 점수 : {{ day.schedule.totalDifficultyScore }}</div>
                  <div v-else>&nbsp;</div>
                </div>
                <div class="content">
                  <div v-if="day.schedule">성취도 : {{ day.schedule.todayDonePercent }}%</div>
                  <div v-else>&nbsp;</div>
                </div>
                <div class="content">
                  <div v-if="day.schedule">메인 태그 : {{ day.schedule.mainTagName }}</div>
                  <div v-else>&nbsp;</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { getCalendarSchedules } from '@/api/calendar-schedule.js';

  export default {
    name: 'CalendarSchedule',
    props: {
      year: Number,
      month: Number,
    },
    data() {
      return {
        daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
        schedules: [],
      };
    },
    computed: {
      calendar() {
        const firstDay = new Date(this.year, this.month - 1, 1);
        const lastDay = new Date(this.year, this.month, 0);
        const firstDayOfWeek = firstDay.getDay();
        const lastDayOfMonth = lastDay.getDate();
  
        let date = 1;
        const calendar = [];
  
        while (date <= lastDayOfMonth) {
          const week = [];
          for (let j = 0; j < 7; j++) {
            if (date > lastDayOfMonth) {
              week.push({ day: '', date: null });
            } else if (j < firstDayOfWeek && calendar.length === 0) {
              week.push({ day: '', date: null });
            } else {
              const schedule = this.findScheduleForDate(date);
              week.push({ day: date, date: new Date(this.year, this.month - 1, date), schedule });
              date++;
            }
          }
          calendar.push(week);
        }
  
        return calendar;
      },
    },
    methods: {
      dayClasses(index) {
        return {
          'blue': index === 6, // 토요일
          'red': index === 0,  // 일요일
        };
      },
  
      selectDate(day) {
        if (day.date) {
          // 선택한 날짜에 대한 처리 로직 추가
          console.log(day.date);
        }
      },

      async fetchCalendarSchedules() {
        const yearMonth = this.getFormattedYearMonth();
        try {
          const response = await getCalendarSchedules({ yearMonth });
          this.schedules = response.data;
        } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
        }
      },

      getFormattedYearMonth() {
        return `${this.year}-${this.month.toString().padStart(2, '0')}`;
      },

      findScheduleForDate(day) {
        const date = new Date(this.year, this.month - 1, day);
        return this.schedules.find(schedule => {
          const scheduleDate = new Date(schedule.yearAndMonthAndDay);
          return (
            scheduleDate.getFullYear() === date.getFullYear() &&
            scheduleDate.getMonth() === date.getMonth() &&
            scheduleDate.getDate() === date.getDate()
          );
        });
      },
    },
    created() {
      this.fetchCalendarSchedules();
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 80%;
    border-collapse: collapse;
    aspect-ratio: 2 / 1;
  }
  
  .content {
    text-align: center;
    font-size: 0.75vw;
  }
  
  .table th, .table td {
    border: 1px solid #ddd;
    box-sizing: border-box; /* 너비에 padding과 border를 포함시킵니다. */
  }
  
  @media screen and (max-width: 800px) {
    .table {
      width: 100%;
    }
  
    .day {
      font-size: 2.2vw;
    }
    .content {
      font-size: 1.25vw;
    }
  
  }
  
  th {
    background-color: #f2f2f2;
    color: #333;
  }
  
  .red {
    color: red;
  }
  
  .blue {
    color: blue;
  }
  </style>
  
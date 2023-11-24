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
    
    <Goals/>

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
            <td v-for="(day, index) in week" :key="index" @click="selectDate(day)" style="cursor: pointer;">
              <div v-if="day.date">
                <div :class="dayClasses(index)" class="day">
                  {{ day.day }}
                </div>
                <div class="content">12345151356</div>
                <div class="content">12345151356</div>
                <div class="content">12345151356</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Goals from "../components/Goals.vue";

export default {
  name: 'Calendar',
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
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
            week.push({ day: date, date: new Date(this.year, this.month - 1, date) });
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

    prevMonth() {
      this.month -= 1;
      if (this.month < 1) {
        this.month = 12;
        this.year -= 1;
      }
    },

    nextMonth() {
      this.month += 1;
      if (this.month > 12) {
        this.month = 1;
        this.year += 1;
      }
    },

    selectDate(day) {
      if (day.date) {
        // 선택한 날짜에 대한 처리 로직 추가
        console.log(day.date);
      }
    },

  },
  components: {
    Goals : Goals
  },
}

</script>

<style scoped>
.table {
  width: 80%;
  border-collapse: collapse;
}

.content {
  text-align: center;
}

.table th, .table td {
  border: 1px solid #ddd;
  box-sizing: border-box; /* 너비에 padding과 border를 포함시킵니다. */
}

.btn {
  --bs-btn-font-size: 1.25vw;
}

@media screen and (max-width: 800px) {
  .table {
    width: 100%;
  }

  .day {
    font-size: 2.2vw;
  }
  .content {
    font-size: 1.5vw;
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

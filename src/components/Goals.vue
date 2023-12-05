<template>
  <div class="container my-5">
    <div class="d-flex align-items-center justify-content-between mb-1">
      <div class="d-flex align-items-center">
        <h5 class="container-name my-1">목표 리스트</h5>
        <button @click="showGoalForm" class="btn px-1">
          <i class="bi bi-plus fs-4"></i>
        </button>  
      </div>
      <button @click="showAllGoals" class="btn btn-secondary">
        <i class="bi bi-list"></i>
      </button>
    </div>

    <div v-if="isShowGoalForm" class="goal-form border px-2 py-2">
      <form @submit.prevent="addGoal">
        <div class="mb-1">
          <label class="form-label">목표 이름</label>
          <input v-model="newGoalName" type="text" class="form-control" placeholder="새로운 목표를 입력하세요" required>
        </div>
        <div class="mb-2">
          <label class="form-label">기간</label>
          <input v-model.number="newGoalPeriod" type="number" class="form-control" placeholder="목표의 기간(month)을 입력하세요" required>
        </div>

        <AlertWarning @turnOff="isGoalCreateWarningAlert = $event" message="입력값이 잘못되었습니다." :isVisible="isGoalCreateWarningAlert"/>
        <AlertWarning @turnOff="isGoalDuplicatedAlert = $event" message="캘린더에 목표가 중복되었습니다." :isVisible="isGoalDuplicatedAlert"/>
        <AlertServerError @turnOff="isServerError = $event" :isVisible="isServerError"/>

        <div class="text-center">
          <button type="submit" class="btn btn-primary form-btn">추가</button>
        </div>
      </form>
    </div>

    <div class="row">
      <div v-for="(goal, index) in visibleGoals" :key="index" class="col-6">
        <div class="accordion" :id="'accordionExample' + index">
          <div class="accordion-item">
            <div class="accordion-header d-flex justify-content-between align-items-center">
              <div class="accordion-name text-break px-1" data-bs-toggle="dropdown" style="cursor: pointer;">
                {{ goal.name }}
              </div>
              <ul class="dropdown-menu">
                <li @click="showGoalChangeForm(goal)" class="dropdown-item" style="cursor: pointer;">목표 이름 변경</li>
                <li @click="showGoalPeriodForm(goal)" class="dropdown-item" style="cursor: pointer;">목표 기간 추가</li>
                <li class="dropdown-item" style="cursor: pointer;">목표 상태 변경</li>
                <li class="dropdown-item" style="cursor: pointer;">목표 삭제</li>
                <li class="dropdown-item" style="cursor: pointer;">서브 목표 생성</li>
              </ul>

              <div  class="d-flex align-items-center" >
                <div v-if="goal.goalStatus" class="oval-label px-1">
                  <span class="label-text">{{ goal.goalStatus }}</span>
                </div>
                <button
                  class="btn collapsed"
                  type="button"
                  :data-bs-toggle="'collapse'"
                  :data-bs-target="'#collapse' + index"
                  :aria-expanded="false"
                  :aria-controls="'collapse' + index"
                >
                  <i class="bi bi-chevron-down"></i>
                </button>
              </div>
            </div>

            <div v-if="goal.showGoalChangeForm" class="border px-1 py-1" style="width: 80%;">
              <form @submit.prevent="changeName(goal)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">목표 이름 변경</label>
                  <button @click="goal.showGoalChangeForm = !goal.showGoalChangeForm;" type="button" class="btn-close"></button>
                </div>
                <div class="input-group">
                  <input v-model="newGoalName" type="text" class="form-control" placeholder="새로운 이름을 입력하세요" required>
                  <button type="submit" class="btn btn-secondary form-btn">변경</button>
                </div>

                

              </form>
            </div>

            <div v-if="goal.showGoalPeriodForm" class="border px-1 py-1" style="width: 80%;">
              <form @submit.prevent="addGoalPeriod(goal)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">목표 기간 추가</label>
                  <button @click="goal.showGoalPeriodForm = !goal.showGoalPeriodForm;" type="button" class="btn-close"></button>
                </div>
                <div class="input-group">
                  <input v-model.number="newGoalPeriod" type="number" class="form-control" placeholder="목표의 기간(month)을 입력하세요" required>
                  <button type="submit" class="btn btn-secondary form-btn">변경</button>
                </div>

          

              </form>
            </div>

            <div
              :id="'collapse' + index"
              class="accordion-collapse collapse"
              :data-bs-parent="'#accordionExample' + index"
            >
              <div class="accordion-body">
                <div v-for="(subGoal, index) in goal.subGoalResponses" :key="index">
                  <div class="d-flex align-items-center">
                    <div class="accordion-name">
                      {{ subGoal.name }}
                    </div>
                    <div v-if="subGoal.subGoalStatus" class="oval-label mx-1">
                      <span class="label-text">{{ subGoal.subGoalStatus }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AlertWarning from "@/components/basic/AlertWarning.vue";
import AlertServerError from "@/components/basic/AlertServerError.vue";

import { saveGoal, changeGoalName, addGoalToCalendars } from '@/api/goals.js';

export default {
  name: 'Goals',
  components: {
    AlertWarning: AlertWarning,
    AlertServerError: AlertServerError,
  },
  props: {
    calendarId: Number,
    yearMonth: String,
    goals: Array
  },
  data() {
    return {
      showAll: false,
      isShowGoalForm: false,
      newGoalName: '',
      newGoalPeriod: null,
      isGoalCreateWarningAlert: false, isGoalDuplicatedAlert: false,
      isServerError: false,
    };
  },
  computed: {
    visibleGoals() {
      return this.showAll ? this.goals : this.goals.slice(0, 2);
    },
  },
  methods: {
    showAllGoals() {
      this.showAll = !this.showAll;
    },

    showGoalForm() {
      this.newGoalName = '';
      this.newGoalPeriod = null;
      this.isShowGoalForm = !this.isShowGoalForm;
    },

    showGoalChangeForm(goal) {
      this.newGoalName = '';
      goal.showGoalChangeForm = !goal.showGoalChangeForm;
    },

    showGoalPeriodForm(goal) {
      this.newGoalPeriod = null;
      goal.showGoalPeriodForm = !goal.showGoalPeriodForm;
    },
    
    async addGoal() {
      if (!this.checkNumberForm()) {
        this.isGoalCreateWarningAlert = true;
        return;
      }

      const data = await this.createGoal();
      if (data == undefined) return;

      const newGoal = {
        id: data.goalId,
        name: data.goalName,
        goalStatus: 'TODO'
      };
      this.$emit('addGoal', newGoal);
      this.isShowGoalForm = false;
    },

    checkNumberForm() {
      if (!Number.isInteger(this.newGoalPeriod) || this.newGoalPeriod <= 0) {
        return false;
      }
      return true;
    },

    async createGoal() {
      try {
        const response = await saveGoal( this.newGoalName, this.makeYearMonths(new Date()));
        return response.data;
      } catch (error) {
        if (this.handleGoalDuplicatedError(error)) {
          return;
        }
        this.isServerError = true;
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    makeYearMonths(date) {
      const yearMonths = [];

      for (let i = 0; i < this.newGoalPeriod; i++) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
        
        yearMonths.push(formattedDate);

        date.setMonth(date.getMonth() + 1);
      }

      return yearMonths;
    },

    handleGoalDuplicatedError(error) {
      if (error.response && error.response.data.message === '캘린더에 목표가 중복되었습니다.') {
          this.isGoalDuplicatedAlert = true;
          return true;
      }
      return false;
    },

    async changeName(goal) {
      try {
        const response = await changeGoalName( {
          calendarId: this.calendarId,
          goalId: goal.id,
          yearMonth: this.yearMonth,
          goalName: goal.name,
          newGoalName: this.newGoalName
        });
        goal.name = response.data.newGoalName;
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    async addGoalPeriod(goal) {
      if (!this.checkNumberForm()) {
        return;
      }
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      try {
        await addGoalToCalendars(goal.id, this.makeYearMonths(date));
        this.isGoalPeriodSuccessAlert = true;
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },
  },

};
</script>

<style scoped>
 .container {
  width: 80%;
 }

 .goal-form {
    width: 40%;
 }

 .accordion-name {
  font-size: 1.0vw;
 }

 .accordion-name:hover {
    color: #aeac8d; 
    transition: background-color 0.3s; 
  }

 @media screen and (max-width: 700px) { 
  .container {
    font-size: 1.2vw;
  }

  .container-name {
    font-size: 3.0vw;
  }

  .goal-form {
    width: 50%;
  }

  .form-label {
    font-size: 1.25vw;
  }

  .form-control {
    font-size: 1.0vw;
  }

  .form-btn {
    font-size: 1.25vw;
    padding: 2px 4px;
  }

  button {
    font-size: 2.0vw;
    padding: 3px 6px;
  }

  .accordion-name {
    font-size: 1.8vw;
  }

  .label-text {
    font-size: 1.0vw;
  }

  .dropdown-menu {
    font-size: 1.0vw;
    min-width: 3rem;
  }

  .dropdown-item {
    padding: 4px 8px;
  }

}
</style>

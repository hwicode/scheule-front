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
          <label for="goalName" class="form-label">목표 이름</label>
          <input v-model="newGoalName" type="text" class="form-control" id="goalName" placeholder="새로운 목표를 입력하세요">
        </div>
        <div class="mb-2">
          <label for="goalPeriod" class="form-label">기간</label>
          <input v-model.number="newGoalPeriod" type="number" class="form-control" id="goalPeriod" placeholder="목표의 기간(month)을 입력하세요">
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary goal-form-btn">추가</button>
        </div>
      </form>
    </div>

    <div class="row">
      <div v-for="(goal, index) in visibleGoals" :key="index" class="col-6">
        <div class="accordion" :id="'accordionExample' + index">
          <div class="accordion-item">
            <div class="accordion-header d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center" style="cursor: pointer;">
                <div class="accordion-name">
                  {{ goal.name }}
                </div>
                <div v-if="goal.goalStatus" class="oval-label mx-1">
                  <span class="label-text">{{ goal.goalStatus }}</span>
                </div>
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
import { saveGoal } from '@/api/goals.js';

export default {
  name: 'Goals',
  props: {
      goals: Array
  },
  data() {
    return {
      showAll: false,
      isShowGoalForm: false,
      newGoalName: '',
      newGoalPeriod: null,
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
    
    async addGoal() {
      if (this.newGoalName.trim() !== '' && Number.isInteger(this.newGoalPeriod) && this.newGoalPeriod > 0) {
        const data = await this.createGoal();
        const newGoal = {
          id: data.goalId,
          name: data.goalName,
          goalStatus: 'TODO'
        };
        this.$emit('addGoal', newGoal);
        this.isShowGoalForm = false;
      }
    },

    async createGoal() {
        try {
          const response = await saveGoal( this.newGoalName, this.makeYearMonths());
          return response.data;
        } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
        }
    },

    makeYearMonths() {
      const date = new Date();
      const yearMonths = [];

      for (let i = 0; i < this.newGoalPeriod; i++) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
        
        yearMonths.push(formattedDate);

        date.setMonth(date.getMonth() + 1);
      }

      return yearMonths;
    }
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
    font-size: 1.5vw;
  }

  .form-control {
    font-size: 1.0vw;
  }

  .goal-form-btn {
    font-size: 1.0vw;
    padding: 3px 6px;
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

}
</style>

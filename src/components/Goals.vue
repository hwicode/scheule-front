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

        <AlertWarning @turnOff="isGoalCreateWarningAlert = $event" message="목표 기간은 1~24까지의 수만 가능합니다." :isVisible="isGoalCreateWarningAlert"/>
        <AlertWarning @turnOff="isGoalDuplicatedAlert = $event" message="캘린더에 같은 이름의 목표가 이미 있습니다." :isVisible="isGoalDuplicatedAlert"/>
        <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>

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
                <li @click="showGoalStatusForm(goal)" class="dropdown-item" style="cursor: pointer;">목표 상태 변경</li>
                <li @click="showGoalDeleteForm(goal)" class="dropdown-item" style="cursor: pointer;">목표 삭제</li>
                <li @click="showSubGoalCreateForm(goal)" class="dropdown-item" style="cursor: pointer;">서브 목표 생성</li>
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
              <AlertWarning @turnOff="isGoalDuplicatedAlert = $event" message="캘린더에 같은 이름의 목표가 이미 있습니다." :isVisible="isGoalDuplicatedAlert"/>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
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
              <AlertWarning @turnOff="isGoalCreateWarningAlert = $event" message="목표 기간은 1~24까지의 수만 가능합니다." :isVisible="isGoalCreateWarningAlert"/>
              <AlertWarning @turnOff="isGoalDuplicatedAlert = $event" message="캘린더에 목표가 이미 있습니다." :isVisible="isGoalDuplicatedAlert"/>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div v-if="goal.showGoalStatusForm" class="border px-1 py-1" style="width: 80%;">
              <form @submit.prevent="changeGoalStatus(goal)">
                <div class="d-flex justify-content-between mb-2">
                  <label class="form-label">목표 상태 변경</label>
                  <button @click="goal.showGoalStatusForm = !goal.showGoalStatusForm;" type="button" class="btn-close"></button>
                </div>
                <div class="d-flex justify-content-between">
                  <div>
                    <div class="form-check form-check-inline mx-1">
                      <input v-model="selectedGoalStatus" value="TODO" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                      <label class="form-check-label" for="flexRadioDefault1">
                        To Do
                      </label>
                    </div>
                    <div class="form-check form-check-inline mx-1">
                      <input v-model="selectedGoalStatus" value="PROGRESS" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                      <label class="form-check-label" for="flexRadioDefault2">
                        Progress
                      </label>
                    </div>
                    <div class="form-check form-check-inline mx-1">
                      <input v-model="selectedGoalStatus" value="DONE" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                      <label class="form-check-label" for="flexRadioDefault3">
                        Done
                      </label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-secondary form-btn">변경</button>
                </div>
              </form>
              <AlertWarning @turnOff="isNotAllToDoSubGoalAlert = $event" message="서브 목표가 전부 TODO 상태가 아닙니다." :isVisible="isNotAllToDoSubGoalAlert"/>
              <AlertWarning @turnOff="isNotAllDoneSubGoalAlert = $event" message="서브 목표가 전부 DONE 상태가 아닙니다." :isVisible="isNotAllDoneSubGoalAlert"/>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div v-if="goal.showGoalDeleteForm" class="border px-1 py-1" style="width: 80%;">
              <form @submit.prevent="deleteGoal(goal)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">목표 삭제</label>
                  <button @click="goal.showGoalDeleteForm = !goal.showGoalDeleteForm;" type="button" class="btn-close"></button>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-secondary form-btn">삭제</button>
                </div>
              </form>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div v-if="goal.showSubGoalCreateForm" class="border px-1 py-1" style="width: 80%;">
              <form @submit.prevent="createSubGoal(goal)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">서브 목표 생성</label>
                  <button @click="goal.showSubGoalCreateForm = !goal.showSubGoalCreateForm;" type="button" class="btn-close"></button>
                </div>
                <div class="input-group">
                  <input v-model="newSubGoalName" type="text" class="form-control" placeholder="새로운 이름을 입력하세요" required>
                  <button type="submit" class="btn btn-secondary form-btn">추가</button>
                </div>
              </form>
              <AlertWarning @turnOff="isSubGoalDuplicatedAlert = $event" message="캘린더에 같은 이름의 서브 목표가 이미 있습니다." :isVisible="isSubGoalDuplicatedAlert"/>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div
              :id="'collapse' + index"
              class="accordion-collapse collapse"
              :data-bs-parent="'#accordionExample' + index"
            >
              <div class="accordion-body">
                <div v-for="(subGoal, index) in goal.subGoalResponses" :key="index">
                  <div class="d-flex align-items-center">
                    <div class="accordion-name text-break px-1" data-bs-toggle="dropdown" style="cursor: pointer;">
                      {{ subGoal.name }}
                    </div>
                    <ul class="dropdown-menu">
                      <li @click="showSubGoalChangeNameForm(goal, subGoal)" class="dropdown-item" style="cursor: pointer;">서브 목표 이름 변경</li>
                      <li @click="showSubGoalChangeStatusForm(goal, subGoal)" class="dropdown-item" style="cursor: pointer;">서브 목표 상태 변경</li>
                      <li @click="showSubGoalDeleteForm(goal, subGoal)" class="dropdown-item" style="cursor: pointer;">서브 목표 삭제</li>
                    </ul>
                    <div v-if="subGoal.subGoalStatus" class="oval-label mx-1">
                      <span class="label-text">{{ subGoal.subGoalStatus }}</span>
                    </div>
                  </div>

                  <div v-if="subGoal.showSubGoalChangeForm" class="border px-1 py-1" style="width: 80%;">
                    <form @submit.prevent="changeSubGoalName(goal, subGoal)">
                      <div class="d-flex align-items-center justify-content-between mb-2">
                        <label class="form-label">서브 목표 이름 변경</label>
                        <button @click="subGoal.showSubGoalChangeForm = !subGoal.showSubGoalChangeForm;" type="button" class="btn-close"></button>
                      </div>
                      <div class="input-group">
                        <input v-model="newSubGoalName" type="text" class="form-control" placeholder="새로운 이름을 입력하세요" required>
                        <button type="submit" class="btn btn-secondary form-btn">변경</button>
                      </div>
                    </form>
                    <AlertWarning @turnOff="isSubGoalDuplicatedAlert = $event" message="캘린더에 같은 이름의 서브 목표가 이미 있습니다." :isVisible="isSubGoalDuplicatedAlert"/>
                    <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
                  </div>

                  <div v-if="subGoal.showSubGoalStatusForm" class="border px-1 py-1" style="width: 80%;">
                    <form @submit.prevent="changeSubGoalStatus(goal, subGoal)">
                      <div class="d-flex justify-content-between mb-2">
                        <label class="form-label">서브 목표 상태 변경</label>
                        <button @click="subGoal.showSubGoalStatusForm = !subGoal.showSubGoalStatusForm;" type="button" class="btn-close"></button>
                      </div>
                      <div class="d-flex justify-content-between">
                        <div>
                          <div class="form-check form-check-inline mx-1">
                            <input v-model="selectedSubGoalStatus" value="TODO" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                              To Do
                            </label>
                          </div>
                          <div class="form-check form-check-inline mx-1">
                            <input v-model="selectedSubGoalStatus" value="DONE" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                            <label class="form-check-label" for="flexRadioDefault3">
                              Done
                            </label>
                          </div>
                        </div>
                        <button type="submit" class="btn btn-secondary form-btn">변경</button>
                      </div>
                    </form>
                    <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
                  </div>

                  <div v-if="subGoal.showSubGoalDeleteForm" class="border px-1 py-1" style="width: 80%;">
                    <form @submit.prevent="deleteSubGoal(goal, subGoal, index)">
                      <div class="d-flex align-items-center justify-content-between mb-2">
                        <label class="form-label">서브 목표 삭제</label>
                        <button @click="subGoal.showSubGoalDeleteForm = !subGoal.showSubGoalDeleteForm;" type="button" class="btn-close"></button>
                      </div>
                      <div class="text-center">
                        <button type="submit" class="btn btn-secondary form-btn">삭제</button>
                      </div>
                    </form>
                    <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
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

import { saveGoal, changeGoalName, addGoalToCalendars, changeGoalStatusApi, deleteGoalApi, saveSubGoalApi, changeSubGoalNameApi, changeSubGoalStatusApi, deleteSubGoalApi } from '@/api/goals.js';

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
      selectedGoalStatus: null,
      newSubGoalName: '',
      selectedSubGoalStatus: null,

      isServerErrorAlert: false,
      isGoalCreateWarningAlert: false, isGoalDuplicatedAlert: false,
      isNotAllToDoSubGoalAlert: false, isNotAllDoneSubGoalAlert: false,
      isSubGoalDuplicatedAlert: false,
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
      this.closeAllGoalChangeForm();
      this.newGoalName = '';
      goal.showGoalChangeForm = !goal.showGoalChangeForm;
    },

    closeAllGoalChangeForm() {
      this.goals.forEach(goal => goal.showGoalChangeForm = false);
    },

    showGoalPeriodForm(goal) {
      this.closeAllGoalPeriodForm();
      this.newGoalPeriod = null;
      goal.showGoalPeriodForm = !goal.showGoalPeriodForm;
    },

    closeAllGoalPeriodForm() {
      this.goals.forEach(goal => goal.showGoalPeriodForm = false);
    },

    showGoalStatusForm(goal) {
      this.closeAllGoalStatusForm();
      goal.showGoalStatusForm = !goal.showGoalStatusForm;
    },

    closeAllGoalStatusForm() {
      this.goals.forEach(goal => goal.showGoalStatusForm = false);
    },

    showGoalDeleteForm(goal) {
      this.closeAllGoalDeleteForm();
      goal.showGoalDeleteForm = !goal.showGoalDeleteForm;
    },

    closeAllGoalDeleteForm() {
      this.goals.forEach(goal => goal.showGoalDeleteForm = false);
    },

    showSubGoalCreateForm(goal) {
      this.closeAllSubGoalCreateForm();
      this.newSubGoalName = '';
      goal.showSubGoalCreateForm = !goal.showSubGoalCreateForm;
    },

    closeAllSubGoalCreateForm() {
      this.goals.forEach(goal => goal.showSubGoalCreateForm = false);
    },

    showSubGoalChangeNameForm(goal, subGoal) {
      this.closeAllSubGoalCreateForm(goal.subGoalResponses);
      this.newSubGoalName = '';
      subGoal.showSubGoalChangeForm = !subGoal.showSubGoalChangeForm;
    },

    closeAllSubGoalChangeNameForm(subGoals) {
      subGoals.forEach(subGoal => subGoal.showSubGoalChangeForm = false);
    },

    showSubGoalChangeStatusForm(goal, subGoal) {
      this.closeAllSubGoalStatusForm(goal.subGoalResponses);
      subGoal.showSubGoalStatusForm = !subGoal.showSubGoalStatusForm;
    },

    closeAllSubGoalStatusForm(subGoals) {
      subGoals.forEach(subGoal => subGoal.showSubGoalStatusForm = false);
    },

    showSubGoalDeleteForm(goal, subGoal) {
      this.closeAllSubGoalDeleteForm(goal.subGoalResponses);
      subGoal.showSubGoalDeleteForm = !subGoal.showSubGoalDeleteForm;
    },

    closeAllSubGoalDeleteForm(subGoals) {
      subGoals.forEach(subGoal => subGoal.showSubGoalStatusForm = false);
    },
    
    async addGoal() {
      if (!Number.isInteger(this.newGoalPeriod) || this.newGoalPeriod <= 0 || this.newGoalPeriod > 24) {
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

    async createGoal() {
      try {
        const response = await saveGoal( this.newGoalName, this.makeYearMonths(new Date()));
        return response.data;
      } catch (error) {
        this.handleGoalDuplicatedError(error);
        return;
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
          return;
      }
      this.handleServerError();
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
        goal.showGoalChangeForm = false;
      } catch (error) {
        this.handleGoalDuplicatedError(error);
        return;
      }
    },

    async addGoalPeriod(goal) {
      if (!Number.isInteger(this.newGoalPeriod) || this.newGoalPeriod <= 0 || this.newGoalPeriod > 24) {
        this.isGoalCreateWarningAlert = true;
        return;
      }

      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      try {
        await addGoalToCalendars(goal.id, this.makeYearMonths(date));
        goal.showGoalPeriodForm = false;
      } catch (error) {
        this.handleGoalDuplicatedError(error);
        return;
      }
    },

    async changeGoalStatus(goal) {
      try {
        const response = await changeGoalStatusApi(goal.id, this.selectedGoalStatus);
        goal.showGoalStatusForm = false;
        goal.goalStatus = response.data.goalStatus;
      } catch (error) {
        this.handleGoalStatusError(error);
        return;
      }
    },

    handleGoalStatusError(error) {
      if (error.response && error.response.data.message === '서브 목표가 전부 TODO 상태가 아닙니다.') {
          this.isNotAllToDoSubGoalAlert = true;
          return;
      }
      if (error.response && error.response.data.message === '서브 목표가 전부 DONE 상태가 아닙니다.') {
          this.isNotAllDoneSubGoalAlert = true;
          return;
      }
      this.handleServerError();
    },

    async deleteGoal(goal) {
      try {
        await deleteGoalApi(goal.id);
        this.$emit('deleteGoal', goal);
      } catch (error) {
        this.handleServerError(error);
        return;
      }
    },

    handleServerError(error) {
      this.isServerErrorAlert = true;
      console.log(`오류가 발생했습니다: ${error}`);
    },

    async createSubGoal(goal) {
      try {
        const response = await saveSubGoalApi(goal.id, this.newSubGoalName);
        const newSubGoal = {
          id: response.data.subGoalId,
          name: response.data.subGoalName,
          subGoalStatus: 'TODO',
          goalId: goal.id
        };
        goal.subGoalResponses.push(newSubGoal);
        goal.showSubGoalCreateForm = false;
      } catch (error) {
        this.handleSubGoalDuplicatedError(error);
        return;
      }
    },

    handleSubGoalDuplicatedError(error) {
      if (error.response && error.response.data.message === '서브 목표가 중복되었습니다.') {
          this.isSubGoalDuplicatedAlert = true;
          return;
      }
      this.handleServerError();
    },

    async changeSubGoalName(goal, subGoal) {
      try {
        const response = await changeSubGoalNameApi( {
          goalId: goal.id,
          subGoalId: subGoal.id,
          subGoalName: subGoal.name,
          newSubGoalName: this.newSubGoalName
        });
        subGoal.name = response.data.newSubGoalName;
        subGoal.showSubGoalChangeForm = false;
      } catch (error) {
        this.handleSubGoalDuplicatedError(error);
        return;
      }
    },

    async changeSubGoalStatus(goal, subGoal) {
      try {
        const response = await changeSubGoalStatusApi( {
          goalId: goal.id,
          subGoalId: subGoal.id,
          subGoalName: subGoal.name,
          subGoalStatus: this.selectedSubGoalStatus
        });
        subGoal.showSubGoalStatusForm = false;
        goal.goalStatus = response.data.modifiedGoalStatus;
        subGoal.subGoalStatus = response.data.modifiedSubGoalStatus;
      } catch (error) {
        this.handleGoalStatusError(error);
        return;
      }
    },

    async deleteSubGoal(goal, subGoal, index) {
      try {
        await deleteSubGoalApi(goal.id, subGoal.name);
        subGoal.showSubGoalDeleteForm = false;
        goal.subGoalResponses.splice(index, 1);
      } catch (error) {
        this.handleServerError(error);
        return;
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

  .form-check {
    font-size: 1.2vw;
  }

}
</style>

<template>
  <div>
    <div class="d-flex align-items-center">
      <h4>Study Time Table</h4>
      <button v-if="showTodayScheduleButton()" @click="showLearningTimeForm = !showLearningTimeForm" class="btn px-1">
        <i class="bi bi-plus fs-4"></i>
      </button>  
    </div>

    <div v-if="showLearningTimeForm" class="border px-1 py-1" style="width: 80%;">
      <form @submit.prevent="addLearningTime()">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <label class="form-label">학습 시간을 추가하시나요?</label>
          <button @click="showLearningTimeForm = !showLearningTimeForm;" type="button" class="btn-close"></button>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-secondary form-btn">확인</button>
        </div>
      </form>
      <AlertWarning @turnOff="isDateValidatedAlert = $event" message="계획표의 날짜 또는 그 다음 날까지만 허용됩니다." :isVisible="isDateValidatedAlert"/>
      <AlertWarning @turnOff="isOverlappingLearningTimeAlert = $event" message="다른 학습 시간 사이에 끼어들 수 없습니다." :isVisible="isOverlappingLearningTimeAlert"/>
      <AlertWarning @turnOff="isStartTimeDuplicatedAlert = $event" message="시작 시간이 중복되었습니다." :isVisible="isStartTimeDuplicatedAlert"/>
      <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
    </div>
    
    <table class="table" style="--bs-table-bg: none">
      <thead>
        <tr>
          <th style="width: 25%;">Time</th>
          <th style="width: 15%;" class="text-center">Duration</th>
          <th style="width: 60%;" class="text-center">Activity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(studySession, index) in studySessions" :key="index">
          <td>
            <div class="name-hover" data-bs-toggle="dropdown">
              {{ formatTime(studySession.startTime) }} ~ {{ formatTime(studySession.endTime) }}
            </div>
            <ul class="dropdown-menu">
              <li @click="showEndLearningTimeForm(studySession)" class="dropdown-item" style="cursor: pointer;">끝내기</li>
              <li @click="showChangeStartTimeForm(studySession)" class="dropdown-item" style="cursor: pointer;">시작 시간 변경</li>
              <li @click="showChangeEndTimeForm(studySession)" class="dropdown-item" style="cursor: pointer;">끝 시간 변경</li>
              <li @click="showDeleteLearningTimeForm(studySession)" class="dropdown-item" style="cursor: pointer;">학습 시간 삭제</li>
            </ul>

            <div v-if="studySession.showEndLearningTimeForm" class="border px-1 py-1 my-2" style="width: 320%;">
              <form @submit.prevent="endLearningTime(studySession)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">학습을 끝내시나요?</label>
                  <button @click="studySession.showEndLearningTimeForm = !studySession.showEndLearningTimeForm;" type="button" class="btn-close"></button>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-secondary form-btn">확인</button>
                </div>
              </form>
              <AlertWarning @turnOff="isDateValidatedAlert = $event" message="계획표의 날짜 또는 그 다음 날까지만 허용됩니다." :isVisible="isDateValidatedAlert"/>
              <AlertWarning @turnOff="isOverlappingLearningTimeAlert = $event" message="다른 학습 시간 사이에 끼어들 수 없습니다." :isVisible="isOverlappingLearningTimeAlert"/>
              <AlertWarning @turnOff="isEndTimeDuplicatedAlert = $event" message="종료 시간이 중복되었습니다." :isVisible="isEndTimeDuplicatedAlert"/>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div v-if="studySession.showChangeStartTimeForm" class="border px-1 py-1 my-2" style="width: 320%;">
              <form @submit.prevent="changeStartTime(studySession)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">시작 시간 변경</label>
                  <button @click="studySession.showChangeStartTimeForm = !studySession.showChangeStartTimeForm;" type="button" class="btn-close"></button>
                </div>
                <input v-model.number="inputHour" type="number" class="form-control" placeholder="시(hour)를 입력하세요" min="1" max="24" required>
                <input v-model.number="inputMinute" type="number" class="form-control" placeholder="분(minute)을 입력하세요" min="0" max="59" required>
                <div class="text-center">
                  <button type="submit" class="btn btn-secondary form-btn">확인</button>
                </div>
              </form>
              <AlertWarning @turnOff="isDateValidatedAlert = $event" message="계획표의 날짜 또는 그 다음 날까지만 허용됩니다." :isVisible="isDateValidatedAlert"/>
              <AlertWarning @turnOff="isOverlappingLearningTimeAlert = $event" message="다른 학습 시간 사이에 끼어들 수 없습니다." :isVisible="isOverlappingLearningTimeAlert"/>
              <AlertWarning @turnOff="isStartTimeDuplicatedAlert = $event" message="시작 시간이 중복되었습니다." :isVisible="isStartTimeDuplicatedAlert"/>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div v-if="studySession.showChangeEndTimeForm" class="border px-1 py-1 my-2" style="width: 320%;">
              <form @submit.prevent="changeEndTime(studySession)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">끝 시간 변경</label>
                  <button @click="studySession.showChangeEndTimeForm = !studySession.showChangeEndTimeForm;" type="button" class="btn-close"></button>
                </div>
                <input v-model.number="inputHour" type="number" class="form-control" placeholder="시(hour)를 입력하세요" min="1" max="24" required>
                <input v-model.number="inputMinute" type="number" class="form-control" placeholder="분(minute)을 입력하세요" min="0" max="59" required>
                <div class="text-center">
                  <button type="submit" class="btn btn-secondary form-btn">확인</button>
                </div>
              </form>
              <AlertWarning @turnOff="isDateValidatedAlert = $event" message="계획표의 날짜 또는 그 다음 날까지만 허용됩니다." :isVisible="isDateValidatedAlert"/>
              <AlertWarning @turnOff="isOverlappingLearningTimeAlert = $event" message="다른 학습 시간 사이에 끼어들 수 없습니다." :isVisible="isOverlappingLearningTimeAlert"/>
              <AlertWarning @turnOff="isEndTimeDuplicatedAlert = $event" message="종료 시간이 중복되었습니다." :isVisible="isEndTimeDuplicatedAlert"/>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div v-if="studySession.showDeleteLearningTimeForm" class="border px-1 py-1 my-2" style="width: 320%;">
              <form @submit.prevent="deleteLearningTime(studySession)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">학습을 삭제할까요?</label>
                  <button @click="studySession.showDeleteLearningTimeForm = !studySession.showDeleteLearningTimeForm;" type="button" class="btn-close"></button>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-secondary form-btn">확인</button>
                </div>
              </form>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>
            
          </td>
          <td class="text-center">{{ studySession.duration }}</td>
          <td  class="text-center">
            <div v-if="studySession.taskId" class="name-hover" data-bs-toggle="dropdown">
              {{ tasks.get(studySession.taskId) }}
            </div>
            <div v-else-if="studySession.subTaskId" class="name-hover" data-bs-toggle="dropdown">
              {{ subTasks.get(studySession.subTaskId) }}
            </div>
            <div v-else class="name-hover" data-bs-toggle="dropdown">
              {{ formatSubject(studySession.subject) }}
            </div>
            <ul class="dropdown-menu">
              <li @click="showChangeLearningSubjectForm(studySession)" class="dropdown-item" style="cursor: pointer;">학습 주제 변경</li>
              <li @click="showDeleteLearningSubjectForm(studySession)" class="dropdown-item" style="cursor: pointer;">학습 주제 삭제</li>
            </ul>

            <div v-if="studySession.showDeleteLearningSubjectForm" class="border px-1 py-1 my-2">
              <form @submit.prevent="deleteLearningSubject(studySession)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">학습 주제를 삭제할까요?</label>
                  <button @click="studySession.showDeleteLearningSubjectForm = !studySession.showDeleteLearningSubjectForm;" type="button" class="btn-close"></button>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-secondary form-btn">확인</button>
                </div>
              </form>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div v-if="studySession.showChangeLearningSubjectForm" class="border px-1 py-1 my-2 text-start">
              <form @submit.prevent="deleteLearningSubject(studySession)">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <label class="form-label fw-bold">학습 주제 변경</label>
                  <button  @click="studySession.showChangeLearningSubjectForm = !studySession.showChangeLearningSubjectForm;" type="button" class="btn-close"></button>
                </div>

                <label class="form-label">과제로 주제 설정</label>
                <div class="input-group mb-2">
                  <select @change="selectTask" class="form-select">
                    <option v-for="(task, index) in tasks" :key="index" class="form-control">{{ task[1] }}</option>
                  </select>
                  <button @click="changeTaskOfSubject(studySession)" type="button" class="btn btn-secondary form-btn">변경</button>
                </div>

                <label class="form-label">서브 과제로 주제 설정</label>
                <div class="input-group mb-2">
                  <select @change="selectSubTask" class="form-select">
                    <option v-for="(subTask, index) in subTasks" :key="index" class="form-control">{{ subTask[1] }}</option>
                  </select>
                  <button @click="changeSubTaskOfSubject(studySession)" type="button" class="btn btn-secondary form-btn">변경</button>
                </div>

                <label class="form-label">주제 직접 입력</label>
                <div class="input-group">
                  <input v-model="newSubject" type="text" class="form-control" placeholder="새로운 주제를 입력하세요" required>
                  <button @click="changeSubject(studySession)" type="button" class="btn btn-secondary form-btn">변경</button>
                </div>
              </form>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
   getLearningTimes, saveLearningTimeApi, changeStartTimeApi, changeEndTimeApi, 
   deleteLearningTimeApi, deleteLearningSubjectApi, changeSubjectApi, changeTaskOfSubjectApi,
   changeSubTaskOfSubjectApi,
} from '@/api/time-table.js';
import AlertServerError from "@/components/basic/AlertServerError.vue";
import AlertWarning from "@/components/basic/AlertWarning.vue";

export default {
  name: 'TimeTable',
  components: {
    AlertServerError: AlertServerError,
    AlertWarning: AlertWarning,
  },
  props: {
    date: String,
    dailyScheduleId: Number,
    tasks: Map,
    subTasks: Map,
    showTodayScheduleButton: Function,
  },
  data() {
    return {
      studySessions: [],
      inputHour: null,
      inputMinute: null,
      newSubject: null,
      newTaskId: null,
      newSubTaskId: null,

      showLearningTimeForm: false,

      isServerErrorAlert: false,
      isDateValidatedAlert: false,
      isOverlappingLearningTimeAlert: false,
      isStartTimeDuplicatedAlert: false,
      isEndTimeDuplicatedAlert: false,
    };
  },
  methods: {
    formatTime(dateTime) {
      if (!dateTime) return; 
      return dateTime.split('T')[1].substring(0, 5);
    },

    formatSubject(subject) {
      if (!subject) {
        return '없음';
      }
      return subject
    },

    showEndLearningTimeForm(studySession) {
      this.closeAllEndLearningTimeForm();
      studySession.showEndLearningTimeForm = !studySession.showEndLearningTimeForm;
    },

    closeAllEndLearningTimeForm() {
      this.studySessions.forEach(studySession => studySession.showEndLearningTimeForm = false);
    },

    showChangeStartTimeForm(studySession) {
      this.inputHour = null;
      this.inputMinute = null;
      this.closeAllChangeStartTimeForm();
      studySession.showChangeStartTimeForm = !studySession.showChangeStartTimeForm;
    },

    closeAllChangeStartTimeForm() {
      this.studySessions.forEach(studySession => studySession.showChangeStartTimeForm = false);
    },

    showChangeEndTimeForm(studySession) {
      this.inputHour = null;
      this.inputMinute = null;
      this.closeAllChangeEndTimeForm();
      studySession.showChangeEndTimeForm = !studySession.showChangeEndTimeForm;
    },

    closeAllChangeEndTimeForm() {
      this.studySessions.forEach(studySession => studySession.showChangeEndTimeForm = false);
    },

    showDeleteLearningTimeForm(studySession) {
      this.closeAllDeleteLearningTimeForm();
      studySession.showDeleteLearningTimeForm = !studySession.showDeleteLearningTimeForm;
    },

    closeAllDeleteLearningTimeForm() {
      this.studySessions.forEach(studySession => studySession.showDeleteLearningTimeForm = false);
    },

    showChangeLearningSubjectForm(studySession) {
      this.newSubject = null;
      this.closeAllChangeLearningSubjectForm();
      studySession.showChangeLearningSubjectForm = !studySession.showChangeLearningSubjectForm;
    },

    closeAllChangeLearningSubjectForm() {
      this.studySessions.forEach(studySession => studySession.showChangeLearningSubjectForm = false);
    },

    showDeleteLearningSubjectForm(studySession) {
      this.closeAllDeleteLearningSubjectForm();
      studySession.showDeleteLearningSubjectForm = !studySession.showDeleteLearningSubjectForm;
    },

    closeAllDeleteLearningSubjectForm() {
      this.studySessions.forEach(studySession => studySession.showDeleteLearningSubjectForm = false);
    },

    selectTask(event) {
      const selectedTask = event.target.value;
      for (let [key, value] of this.tasks.entries()) {
        if (value === selectedTask) {
          this.newTaskId = key;
        }
      }
    },

    selectSubTask(event) {
      const selectedSubTask = event.target.value;
      for (let [key, value] of this.subTasks.entries()) {
        if (value === selectedSubTask) {
          this.newSubTaskId = key;
        }
      }
    },

    async fetchLearningTimes() {
      const date = this.date;
      try {
        const response = await getLearningTimes({ date });
        this.studySessions = response.data.sort((a, b) => a.startTime.localeCompare(b.startTime));
        this.initializeStudySessions();
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    initializeStudySessions() {
      this.studySessions = this.studySessions.map(studySession => {
        return this.initializeStudySession(studySession);
      })
    },

    initializeStudySession(studySession) {
      return {
        ...studySession,
        showEndLearningTimeForm: false,
        showChangeStartTimeForm: false,
        showChangeEndTimeForm: false,
        showDeleteLearningTimeForm: false,
        showChangeLearningSubjectForm: false,
        showDeleteLearningSubjectForm: false,
        showTaskOfSubjectForm: false,
        showSubTaskOfSubjectForm: false,
        showSubjectForm: false,
        duration: this.makeDuration(studySession.startTime, studySession.endTime),
      }
    },

    makeDuration(startTime, endTime) {
      return this.formatDuration(
        this.calculateLearningTime(startTime, endTime)
      );
    },

    calculateLearningTime(startTime, endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (end - start < 0) return 0;
      return Math.floor((end - start) / (1000 * 60));
    },

    formatDuration(minutes) {
      if (minutes === 0) return '0h 0m';
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    },

    calculateTotalLearningTime() {
      const tatalLearningTime = this.studySessions.reduce((total, studySession) => {
        return total + this.calculateLearningTime(studySession.startTime, studySession.endTime);
      }, 0);
      this.$emit('changeTotalLearningTime', tatalLearningTime);
    },

    async addLearningTime() {
      try {
        const response = await saveLearningTimeApi( 
          {
            timeTableId: this.dailyScheduleId,
            startTime: this.getNowTime()
          } 
        );
        const newLearningTime = {
          id: response.data.learningTimeId,
          startTime: response.data.startTime,
          endTime: null,
          subject: null,
          taskId: null,
          subTaskId: null
        }
        this.studySessions.push(this.initializeStudySession(newLearningTime));
        this.showLearningTimeForm = false;
      } catch (error) {
        this.handleStartTimeError(error);
      }
    },

    getNowTime() {
      const now = new Date();
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate()}`
      + `T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`
    },

    handleStartTimeError(error) {
      if (error.response && error.response.data.message === '계획표의 날짜 또는 그 다음 날까지만 허용됩니다.') {
          this.isDateValidatedAlert = true;
          return;
      }
      if (error.response && error.response.data.message === '다른 학습 시간 사이에 끼어들 수 없습니다.') {
          this.isOverlappingLearningTimeAlert = true;
          return;
      }
      if (error.response && error.response.data.message === '시작 시간이 중복되었습니다.') {
          this.isStartTimeDuplicatedAlert = true;
          return;
      }
      this.handleServerError();
    },

    handleServerError(error) {
      this.isServerErrorAlert = true;
      console.log(`오류가 발생했습니다: ${error}`);
    },

    async endLearningTime(studySession) {
      try {
        const response = await changeEndTimeApi({ 
          timeTableId: this.dailyScheduleId,
          learningTimeId: studySession.id,
          startTime: studySession.startTime,
          endTime: this.getNowTime()
        });
        studySession.endTime = response.data.endTime;
        studySession.duration = this.makeDuration(studySession.startTime, studySession.endTime);
        studySession.showEndLearningTimeForm = false;
        this.calculateTotalLearningTime();
      } catch (error) {
        this.handleEndTimeError(error);
      }
    },

    handleEndTimeError(error) {
      if (error.response && error.response.data.message === '계획표의 날짜 또는 그 다음 날까지만 허용됩니다.') {
          this.isDateValidatedAlert = true;
          return;
      }
      if (error.response && error.response.data.message === '다른 학습 시간 사이에 끼어들 수 없습니다.') {
          this.isOverlappingLearningTimeAlert = true;
          return;
      }
      if (error.response && error.response.data.message === '종료 시간이 중복되었습니다.') {
          this.isEndTimeDuplicatedAlert = true;
          return;
      }
      this.handleServerError(error);
    },

    async changeStartTime(studySession) {
      try {
        const response = await changeStartTimeApi({ 
          timeTableId: this.dailyScheduleId,
          learningTimeId: studySession.id,
          startTime: studySession.startTime,
          newStartTime: this.getInputTime()
        });
        studySession.startTime = response.data.newStartTime;
        studySession.duration = this.makeDuration(studySession.startTime, studySession.endTime);
        studySession.showChangeStartTimeForm = false;
        if (studySession.endTime) this.calculateTotalLearningTime();
      } catch (error) {
        this.handleStartTimeError(error);
      }
    },

    async changeEndTime(studySession) {
      try {
        const response = await changeEndTimeApi({ 
          timeTableId: this.dailyScheduleId,
          learningTimeId: studySession.id,
          startTime: studySession.startTime,
          endTime: this.getInputTime()
        });
        studySession.endTime = response.data.endTime;
        studySession.duration = this.makeDuration(studySession.startTime, studySession.endTime);
        studySession.showChangeEndTimeForm = false;
        this.calculateTotalLearningTime();
      } catch (error) {
        this.handleEndTimeError(error);
      }
    },

    getInputTime() {
      const now = new Date();
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate()}`
      + `T${this.inputHour.toString().padStart(2, '0')}:${this.inputMinute.toString().padStart(2, '0')}:00`
    },

    async deleteLearningTime(studySession) {
      try {
        await deleteLearningTimeApi({ 
          timeTableId: this.dailyScheduleId,
          learningTimeId: studySession.id,
          startTime: studySession.startTime
        });
        this.studySessions = this.studySessions.filter(item => item.id !== studySession.id);
        studySession.showdeleteLearningTimeForm = false;
        this.calculateTotalLearningTime();
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async deleteLearningSubject(studySession) {
      try {
        await deleteLearningSubjectApi(studySession.id);

        this.deleteAllSubject(studySession);
        studySession.showDeleteLearningSubjectForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    deleteAllSubject(studySession) {
      studySession.subject = null;
      studySession.taskId = null;
      studySession.subTaskId = null;
    },

    async changeTaskOfSubject(studySession) {
      if (!this.newTaskId) {
        this.newTaskId = this.tasks.keys().next().value;
      }
      try {
        await changeTaskOfSubjectApi( {
          learningTimeId: studySession.id,
          subjectOfTaskId: this.newTaskId
        });
        this.deleteAllSubject(studySession);
        studySession.taskId = this.newTaskId;
        studySession.showChangeLearningSubjectForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async changeSubTaskOfSubject(studySession) {
      if (!this.newSubTaskId) {
        this.newSubTaskId = this.subTasks.keys().next().value;
      }
      try {
        await changeSubTaskOfSubjectApi( {
          learningTimeId: studySession.id,
          subjectOfSubTaskId: this.newSubTaskId
        });
        this.deleteAllSubject(studySession);
        studySession.subTaskId = this.newSubTaskId;
        studySession.showChangeLearningSubjectForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async changeSubject(studySession) {
      try {
        await changeSubjectApi( {
          learningTimeId: studySession.id,
          newSubject: this.newSubject
        });
        this.deleteAllSubject(studySession);
        studySession.subject = this.newSubject;
        studySession.showChangeLearningSubjectForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },
  
  },
  created() {
    this.fetchLearningTimes();
  },
};
</script>

<style scoped>
@media screen and (max-width: 700px) { 
  .form-label {
    font-size: 2.5vw;
  }

  .form-btn {
    font-size: 2.0vw;
    padding: 2px 4px;
  }

  .btn-close {
    font-size: 2.5vw;
  }

  .form-control {
    font-size: 2.75vw;
  }

  .form-select {
    font-size: 2.75vw;
  }

}
</style>
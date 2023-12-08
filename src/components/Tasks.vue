<template>
  <div>
    <div class="d-flex align-items-center">
      <h4>To Do</h4>
      <button @click="showTaskForm" class="btn px-1">
        <i class="bi bi-plus fs-4"></i>
      </button>  
    </div>

    <div v-if="isShowTaskForm" class="border px-2 py-2">
      <form @submit.prevent="addTask">
        <div class="mb-2">
          <label class="form-label fw-bold">과제 이름</label>
          <input v-model="newTaskName" type="text" class="form-control" placeholder="새로운 과제를 입력하세요" required>
        </div>

        <label class="form-label fw-bold">난이도</label>
        <div class="d-flex align-items-center justify-content-between">
          <div class="form-check form-check-inline mx-4">
            <input v-model="selectedTaskDifficulty" value="HARD" class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault3">
            <label class="form-check-label" for="flexRadioDefault3">
              Hard
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="selectedTaskDifficulty" value="NORMAL" class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2">
            <label class="form-check-label" for="flexRadioDefault2">
              Normal
            </label>
          </div>
          <div class="form-check form-check-inline mx-4">
            <input v-model="selectedTaskDifficulty" value="EASY" class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
              Easy
            </label>
          </div>
        </div>
        <label class="form-label fw-bold">긴급도</label>
        <div class="d-flex align-items-center justify-content-between">
          <div class="form-check form-check-inline mx-4">
            <input v-model="selectedTaskPriority" value="FIRST" class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
              First
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="selectedTaskPriority" value="SECOND" class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2">
            <label class="form-check-label" for="flexRadioDefault2">
              Second
            </label>
          </div>
          <div class="form-check form-check-inline mx-4">
            <input v-model="selectedTaskPriority" value="THIRD" class="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault3">
            <label class="form-check-label" for="flexRadioDefault3">
              Third
            </label>
          </div>
        </div>
        <label class="form-label fw-bold">중요도</label>
        <div class="d-flex align-items-center justify-content-between">
          <div class="form-check form-check-inline mx-4">
            <input v-model="selectedTaskImportance" value="FIRST" class="form-check-input" type="radio" name="flexRadioDefault3" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
              First
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="selectedTaskImportance" value="SECOND" class="form-check-input" type="radio" name="flexRadioDefault3" id="flexRadioDefault2">
            <label class="form-check-label" for="flexRadioDefault2">
              Second
            </label>
          </div>
          <div class="form-check form-check-inline mx-4">
            <input v-model="selectedTaskImportance" value="THIRD" class="form-check-input" type="radio" name="flexRadioDefault3" id="flexRadioDefault3">
            <label class="form-check-label" for="flexRadioDefault3">
              Third
            </label>
          </div>
        </div>

        <AlertWarning @turnOff="isTaskDuplicatedAlert = $event" message="계획표에 같은 이름의 과제가 이미 있습니다." :isVisible="isTaskDuplicatedAlert"/>
        <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        <div class="text-center">
          <button type="submit" class="btn btn-primary form-btn">추가</button>
        </div>
      </form>
    </div>

    <ul class="list-group">
      <li v-for="(item, index) in items" :key="index" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-bold name-hover"  data-bs-toggle="dropdown" style="cursor: pointer;">{{ item.name }}</span>
          <ul class="dropdown-menu">
            <li @click="showTaskChangeForm(item)" class="dropdown-item" style="cursor: pointer;">과제 이름 변경</li>
            <li @click="showTaskDeleteForm(item)" class="dropdown-item" style="cursor: pointer;">과제 삭제</li>
            <li @click="showSubTaskCreateForm(item)" class="dropdown-item" style="cursor: pointer;">서브 과제 생성</li>
          </ul>

          <div class="d-flex align-items-center justify-content-end flex-wrap">
            <div @click="showTaskStatusForm(item)" class="mx-1" style="cursor: pointer;">
              <i v-if="item.taskStatus == 'TODO'" class="bi bi-circle"></i>
              <i v-if="item.taskStatus == 'PROGRESS'" class="bi bi-dash-circle"></i>
              <i v-if="item.taskStatus == 'DONE'" class="bi bi-check-circle-fill"></i>
            </div>
            <div @click="showTaskPriorityForm(item)" class="oval-label mx-1" style="cursor: pointer;">
              <span v-if="item.priority == 'FIRST'" class="label-text good">긴급도 1</span>
              <span v-if="item.priority == 'SECOND'" class="label-text normal">긴급도 2</span>
              <span v-if="item.priority == 'THIRD'" class="label-text bad">긴급도 3</span>
            </div>
            <div @click="showTaskDifficultyForm(item)" class="oval-label mx-1" style="cursor: pointer;">
              <span v-if="item.difficulty == 'HARD'" class="label-text good">난이도 상</span>
              <span v-if="item.difficulty == 'NORMAL'" class="label-text normal">난이도 중</span>
              <span v-if="item.difficulty == 'EASY'" class="label-text bad">난이도 하</span>
            </div>
            <div @click="showTaskImportanceForm(item)" class="oval-label mx-1" style="cursor: pointer;">
              <span v-if="item.importance == 'FIRST'" class="label-text good">중요도 상</span>
              <span v-if="item.importance == 'SECOND'" class="label-text normal">중요도 중</span>
              <span v-if="item.importance == 'THIRD'" class="label-text bad">중요도 하</span>
            </div>
          </div>
        </div>

        <div v-if="item.showTaskStatusForm" class="border px-1 py-1" style="width: 80%;">
          <form @submit.prevent="changeTaskStatus(item)">
            <div class="d-flex justify-content-between mb-2">
              <label class="form-label">과제 상태 변경</label>
              <button @click="item.showTaskStatusForm = !item.showTaskStatusForm;" type="button" class="btn-close"></button>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskStatus" value="TODO" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    To Do
                  </label>
                </div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskStatus" value="PROGRESS" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                  <label class="form-check-label" for="flexRadioDefault2">
                    Progress
                  </label>
                </div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskStatus" value="DONE" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                  <label class="form-check-label" for="flexRadioDefault3">
                    Done
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-secondary form-btn">변경</button>
            </div>
          </form>
          <AlertWarning @turnOff="isNotAllToDoSubTaskAlert = $event" message="서브 과제가 전부 TODO 상태가 아닙니다." :isVisible="isNotAllToDoSubTaskAlert"/>
          <AlertWarning @turnOff="isNotAllDoneSubTaskAlert = $event" message="서브 과제가 전부 DONE 상태가 아닙니다." :isVisible="isNotAllDoneSubTaskAlert"/>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        <div v-if="item.showTaskPriorityForm" class="border px-1 py-1" style="width: 80%;">
          <form @submit.prevent="changeTaskPriority(item)">
            <div class="d-flex justify-content-between mb-2">
              <label class="form-label">과제 긴급도 변경</label>
              <button @click="item.showTaskPriorityForm = !item.showTaskPriorityForm;" type="button" class="btn-close"></button>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskPriority" value="FIRST" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    First
                  </label>
                </div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskPriority" value="SECOND" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                  <label class="form-check-label" for="flexRadioDefault2">
                    Second
                  </label>
                </div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskPriority" value="THIRD" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                  <label class="form-check-label" for="flexRadioDefault3">
                    Third
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-secondary form-btn">변경</button>
            </div>
          </form>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        <div v-if="item.showTaskDifficultyForm" class="border px-1 py-1" style="width: 80%;">
          <form @submit.prevent="changeTaskDifficulty(item)">
            <div class="d-flex justify-content-between mb-2">
              <label class="form-label">과제 난이도 변경</label>
              <button @click="item.showTaskDifficultyForm = !item.showTaskDifficultyForm;" type="button" class="btn-close"></button>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskDifficulty" value="HARD" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Hard
                  </label>
                </div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskDifficulty" value="NORMAL" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                  <label class="form-check-label" for="flexRadioDefault2">
                    Normal
                  </label>
                </div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskDifficulty" value="EASY" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                  <label class="form-check-label" for="flexRadioDefault3">
                    Easy
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-secondary form-btn">변경</button>
            </div>
          </form>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        <div v-if="item.showTaskImportanceForm" class="border px-1 py-1" style="width: 80%;">
          <form @submit.prevent="changeTaskImportance(item)">
            <div class="d-flex justify-content-between mb-2">
              <label class="form-label">과제 중요도 변경</label>
              <button @click="item.showTaskImportanceForm = !item.showTaskImportanceForm;" type="button" class="btn-close"></button>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskImportance" value="FIRST" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    First
                  </label>
                </div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskImportance" value="SECOND" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                  <label class="form-check-label" for="flexRadioDefault2">
                    Second
                  </label>
                </div>
                <div class="form-check form-check-inline mx-1">
                  <input v-model="selectedTaskImportance" value="THIRD" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                  <label class="form-check-label" for="flexRadioDefault3">
                    Third
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-secondary form-btn">변경</button>
            </div>
          </form>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        <div v-if="item.showTaskChangeForm" class="border px-1 py-1" style="width: 80%;">
          <form @submit.prevent="changeName(item)">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <label class="form-label">과제 이름 변경</label>
              <button @click="item.showTaskChangeForm = !item.showTaskChangeForm;" type="button" class="btn-close"></button>
            </div>
            <div class="input-group">
              <input v-model="newTaskName" type="text" class="form-control" placeholder="새로운 이름을 입력하세요" required>
              <button type="submit" class="btn btn-secondary form-btn">변경</button>
            </div>
          </form>
          <AlertWarning @turnOff="isTaskDuplicatedAlert = $event" message="계획표에 같은 이름의 과제가 이미 있습니다." :isVisible="isTaskDuplicatedAlert"/>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        <div v-if="item.showTaskDeleteForm" class="border px-1 py-1" style="width: 80%;">
          <form @submit.prevent="deleteTask(item)">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <label class="form-label">과제 삭제</label>
              <button @click="item.showTaskDeleteForm = !item.showTaskDeleteForm;" type="button" class="btn-close"></button>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-secondary form-btn">삭제</button>
            </div>
          </form>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        
        <div v-if="item.showSubTaskCreateForm" class="border px-1 py-1" style="width: 80%;">
          <form @submit.prevent="createSubTask(item)">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <label class="form-label">서브 과제 생성</label>
              <button @click="item.showSubTaskCreateForm = !item.showSubTaskCreateForm;" type="button" class="btn-close"></button>
            </div>
            <div class="input-group">
              <input v-model="newSubTaskName" type="text" class="form-control" placeholder="새로운 이름을 입력하세요" required>
              <button type="submit" class="btn btn-secondary form-btn">추가</button>
            </div>
          </form>
          <AlertWarning @turnOff="isSubTaskDuplicatedAlert = $event" message="과제에 같은 이름의 서브 과제가 이미 있습니다." :isVisible="isSubTaskDuplicatedAlert"/>
          <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
        </div>

        <ul v-if="item.subTaskQueryResponses" class="list-group mt-2 list-group-flush">
          <li v-for="(subItem, subIndex) in item.subTaskQueryResponses" :key="subIndex" class="list-group-item">
            <div>
              <span class="name-hover" data-bs-toggle="dropdown" style="cursor: pointer;">{{ subItem.name }}</span>
              <ul class="dropdown-menu">
                <li @click="showSubTaskChangeForm(item, subItem)" class="dropdown-item" style="cursor: pointer;">서브 과제 이름 변경</li>
                <li @click="showSubTaskDeleteForm(item, subItem)" class="dropdown-item" style="cursor: pointer;">서브 과제 삭제</li>
              </ul>
              <i v-if="subItem.subTaskStatus == 'TODO'" class="bi bi-circle mx-1"></i>
              <i v-if="subItem.subTaskStatus == 'PROGRESS'" class="bi bi-dash-circle mx-1"></i>
              <i v-if="subItem.subTaskStatus == 'DONE'" class="bi bi-check-circle mx-1"></i>
            </div>

            <div v-if="subItem.showSubTaskChangeForm" class="border px-1 py-1" style="width: 80%;">
              <form @submit.prevent="changeSubTaskName(item, subItem)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">서브 과제 이름 변경</label>
                  <button @click="subItem.showSubTaskChangeForm = !subItem.showSubTaskChangeForm;" type="button" class="btn-close"></button>
                </div>
                <div class="input-group">
                  <input v-model="newSubTaskName" type="text" class="form-control" placeholder="새로운 이름을 입력하세요" required>
                  <button type="submit" class="btn btn-secondary form-btn">변경</button>
                </div>
              </form>
              <AlertWarning @turnOff="isSubTaskDuplicatedAlert = $event" message="계획표에 같은 이름의 서브 과제가 이미 있습니다." :isVisible="isSubTaskDuplicatedAlert"/>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

            <div v-if="subItem.showSubTaskDeleteForm" class="border px-1 py-1" style="width: 80%;">
              <form @submit.prevent="deleteSubTask(item, subItem, index)">
                <div class="d-flex align-items-center justify-content-between mb-2">
                  <label class="form-label">서브 과제 삭제</label>
                  <button @click="subItem.showSubTaskDeleteForm = !subItem.showSubTaskDeleteForm;" type="button" class="btn-close"></button>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-secondary form-btn">삭제</button>
                </div>
              </form>
              <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
            </div>

          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import AlertWarning from "@/components/basic/AlertWarning.vue";
import AlertServerError from "@/components/basic/AlertServerError.vue";
import { 
  saveTaskApi, changeTaskNameApi, deleteTaskApi, changeTaskStatusApi, 
  changeTaskPriorityOrImportanceApi, changeTaskDifficultyApi, saveSubTaskApi, 
  changeSubTaskNameApi, deleteSubTaskApi } from '@/api/tasks.js';

export default {
  name: 'Tasks',
  components: {
    AlertWarning: AlertWarning,
    AlertServerError: AlertServerError,
  },
  props: {
    dailyScheduleId: Number,
    items: Array,
  },
  data() {
    return {
      isShowTaskForm: false,

      newTaskName: '',
      newSubTaskName: '',
      selectedTaskStatus: null,
      selectedTaskDifficulty: null,
      selectedTaskPriority: null,
      selectedTaskImportance: null,
      
      isServerErrorAlert: false,
      isTaskDuplicatedAlert: false,
      isSubTaskDuplicatedAlert: false,
      isNotAllToDoSubTaskAlert: false,
      isNotAllDoneSubTaskAlert: false,
    };
  },
  methods: {
    showTaskForm() {
      this.newTaskName = '';
      this.isShowTaskForm = !this.isShowTaskForm;
    },

    showTaskChangeForm(task) {
      this.closeAllTaskChangeForm();
      this.newTaskName = '';
      task.showTaskChangeForm = !task.showTaskChangeForm;
    },

    closeAllTaskChangeForm() {
      this.items.forEach(task => task.showTaskChangeForm = false);
    },

    showTaskDeleteForm(task) {
      this.closeAllTaskChangeForm();
      task.showTaskDeleteForm = !task.showTaskDeleteForm;
    },

    closeAllTaskDeleteForm() {
      this.items.forEach(task => task.showTaskDeleteForm = false);
    },

    showTaskStatusForm(task) {
      task.showTaskStatusForm = !task.showTaskStatusForm;
    },

    showTaskImportanceForm(task) {
      task.showTaskImportanceForm = !task.showTaskImportanceForm;
    },

    showTaskPriorityForm(task) {
      task.showTaskPriorityForm = !task.showTaskPriorityForm;
    },

    showTaskDifficultyForm(task) {
      task.showTaskDifficultyForm = !task.showTaskDifficultyForm;
    },

    showSubTaskCreateForm(task) {
      this.closeAllSubTaskCreateForm();
      this.newSubTaskName = '';
      task.showSubTaskCreateForm = !task.showSubTaskCreateForm;
    },

    closeAllSubTaskCreateForm() {
      this.items.forEach(task => task.showSubGoalCreateForm = false);
    },

    showSubTaskChangeForm(task, subTask) {
      this.closeAllSubTaskChangeForm(task.subTaskQueryResponses);
      this.newSubTaskName = '';
      subTask.showSubTaskChangeForm = !subTask.showSubTaskChangeForm;
    },

    closeAllSubTaskChangeForm(subTasks) {
      subTasks.forEach(subTask => subTask.showSubTaskChangeForm = false);
    },

    showSubTaskDeleteForm(task, subTask) {
      this.closeAllSubTaskDeleteForm(task.subTaskQueryResponses);
      subTask.showSubTaskDeleteForm = !subTask.showSubTaskDeleteForm;
    },

    closeAllSubTaskDeleteForm(subTasks) {
      subTasks.forEach(subTask => subTask.showSubTaskDeleteForm = false);
    },

    async addTask() {
      const data = await this.createTask();
      if (data == undefined) return;

      const newTask = {
        id: data.taskId,
        name: this.newTaskName,
        priority: this.selectedTaskPriority,
        importance: this.selectedTaskImportance,
        difficulty: this.selectedTaskDifficulty,
        taskStatus: 'TODO'
      };
      this.$emit('addTask', newTask);
      this.isShowTaskForm = false;
    },

    async createTask() {
      try {
        const response = await saveTaskApi( 
          {
            dailyToDoListId: this.dailyScheduleId,
            taskName: this.newTaskName,
            difficulty: this.selectedTaskDifficulty,
            priority: this.selectedTaskPriority,
            importance: this.selectedTaskImportance
          } 
        );
        return response.data;
      } catch (error) {
        this.handleTaskDuplicatedError(error);
        return;
      }
    },

    handleTaskDuplicatedError(error) {
      if (error.response && error.response.data.message === '과제 체커의 이름이 중복되었습니다.') {
          this.isTaskDuplicatedAlert = true;
          return;
      }
      this.handleServerError();
    },

    handleServerError(error) {
      this.isServerErrorAlert = true;
      console.log(`오류가 발생했습니다: ${error}`);
    },

    async changeName(task) {
      try {
        const response = await changeTaskNameApi( {
          dailyToDoListId: this.dailyScheduleId,
          taskId: task.id,
          taskName: task.name,
          newTaskName: this.newTaskName
        });
        task.name = response.data.newTaskCheckerName;
        task.showTaskChangeForm = false;
      } catch (error) {
        this.handleTaskDuplicatedError(error);
        return;
      }
    },

    async deleteTask(task) {
      try {
        await deleteTaskApi(this.dailyScheduleId, task.id, task.name);
        this.$emit('deleteTask', task);
      } catch (error) {
        this.handleServerError(error);
        return;
      }
    },

    async changeTaskStatus(task) {
      try {
        const response = await changeTaskStatusApi( {
          dailyToDoListId: this.dailyScheduleId, 
          taskId: task.id,
          taskName: task.name,
          taskStatus: this.selectedTaskStatus
        });
        task.showTaskStatusForm = false;
        task.taskStatus = response.data.modifiedTaskStatus;
      } catch (error) {
        this.handleTaskStatusError(error);
        return;
      }
    },

    handleTaskStatusError(error) {
      if (error.response && error.response.data.message === '서브 과제 체커가 전부 TODO 상태가 아닙니다.') {
          this.isNotAllToDoSubTaskAlert = true;
          return;
      }
      if (error.response && error.response.data.message === '서브 과제 체커가 전부 DONE 상태가 아닙니다.') {
          this.isNotAllDoneSubTaskAlert = true;
          return;
      }
      this.handleServerError();
    },

    async changeTaskPriority(task) {
      try {
        const response = await changeTaskPriorityOrImportanceApi( {
          taskId: task.id,
          priority: this.selectedTaskPriority,
          importance: task.importance
        });
        task.showTaskPriorityForm = false;
        task.priority = response.data.modifiedPriority;
      } catch (error) {
        this.handleServerError(error);
        return;
      }
    },

    async changeTaskDifficulty(task) {
      try {
        const response = await changeTaskDifficultyApi( {
          dailyToDoListId: this.dailyScheduleId, 
          taskId: task.id,
          taskName: task.name,
          difficulty: this.selectedTaskDifficulty
        });
        task.showTaskDifficultyForm = false;
        task.difficulty = response.data.modifiedDifficulty;
      } catch (error) {
        this.handleServerError(error);
        return;
      }
    },

    async changeTaskImportance(task) {
      try {
        const response = await changeTaskPriorityOrImportanceApi( {
          taskId: task.id,
          priority: task.priority,
          importance: this.selectedTaskImportance
        });
        task.showTaskImportanceForm = false;
        task.importance = response.data.modifiedImportance;
      } catch (error) {
        this.handleServerError(error);
        return;
      }
    },

    async createSubTask(task) {
      try {
        const response = await saveSubTaskApi( {
          dailyToDoListId: this.dailyScheduleId, 
          taskId: task.id,
          taskName: task.name,
          subTaskName: this.newSubTaskName
        });
        const newSubTask = {
          id: response.data.subTaskId,
          name: response.data.subTaskName,
          subTaskStatus: 'TODO',
          taskId: task.id
        };
        task.subTaskQueryResponses.push(newSubTask);
        task.showSubTaskCreateForm = false;
      } catch (error) {
        this.handleSubTaskDuplicatedError(error);
        return;
      }
    },

    handleSubTaskDuplicatedError(error) {
      if (error.response && error.response.data.message === '서브 과제 체커의 이름이 중복되었습니다.') {
          this.isSubTaskDuplicatedAlert = true;
          return;
      }
      this.handleServerError();
    },

    async changeSubTaskName(task, subTask) {
      try {
        const response = await changeSubTaskNameApi( {
          taskId: task.id,
          subTaskId: subTask.id,
          subTaskName: subTask.name,
          newSubTaskName: this.newSubTaskName
        });
        subTask.name = response.data.newSubTaskCheckerName;
        subTask.showSubTaskChangeForm = false;
      } catch (error) {
        this.handleSubTaskDuplicatedError(error);
        return;
      }
    },

    async deleteSubTask(task, subTask, index) {
      try {
        await deleteSubTaskApi( {
          dailyToDoListId: this.dailyScheduleId,
          taskId: task.id,
          subTaskId: subTask.id,
          taskName: task.name,
          subTaskName: subTask.name
        });
        subTask.showSubTaskDeleteForm = false;
        task.subTaskQueryResponses.splice(index, 1);
      } catch (error) {
        this.handleServerError(error);
        return;
      }
    },

  },
};
</script>

<style scoped>

.name-hover:hover {
    color: #aeac8d; 
    transition: background-color 0.3s; 
}

 @media screen and (max-width: 700px) { 

  .form-label {
    font-size: 1.25vw;
  }

  .form-control {
    font-size: 2.0vw;
  }

  .form-btn {
    font-size: 1.25vw;
    padding: 2px 4px;
  }

  .label-text {
    font-size: 1.0vw;
  }

  span {
    font-size: 2.2vw;
  }

  .form-check {
    font-size: 2.0vw;
    min-height: 0;
  }

}

.good {
  color: rgb(62, 199, 16);
}

.normal {
  color: rgb(206, 132, 28);
}

.bad {
  color: rgb(136, 136, 136);
}
</style>
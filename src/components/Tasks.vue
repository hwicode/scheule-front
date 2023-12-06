<template>
  <div>
    <h4>To Do</h4>
      <ul class="list-group">
        <li v-for="(item, index) in items" :key="index" class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">{{ item.name }}</span>
            <div>
              <i v-if="item.taskStatus == 'TODO'" class="bi bi-circle mx-1"></i>
              <i v-if="item.taskStatus == 'PROGRESS'" class="bi bi-dash-circle mx-1"></i>
              <i v-if="item.taskStatus == 'DONE'" class="bi bi-check-circle-fill mx-1"></i>
              <div class="oval-label mx-1 good">
                <span v-if="item.priority == 'FIRST'" class="label-text good">우선순위 1</span>
                <span v-if="item.priority == 'SECOND'" class="label-text normal">우선순위 2</span>
                <span v-if="item.priority == 'THIRD'" class="label-text bad">우선순위 3</span>
              </div>
              <div class="oval-label mx-1 bad">
                <span v-if="item.difficulty == 'HARD'" class="label-text good">난이도 상</span>
                <span v-if="item.difficulty == 'NORMAL'" class="label-text normal">난이도 중</span>
                <span v-if="item.difficulty == 'EASY'" class="label-text bad">난이도 하</span>
              </div>
              <div class="oval-label mx-1">
                <span v-if="item.importance == 'FIRST'" class="label-text good">중요도 상</span>
                <span v-if="item.importance == 'SECOND'" class="label-text normal">중요도 중</span>
                <span v-if="item.importance == 'THIRD'" class="label-text bad">중요도 하</span>
              </div>
            </div>
          </div>
          <ul v-if="item.subTaskQueryResponses" class="list-group mt-2 list-group-flush">
            <li v-for="(subitem, subIndex) in item.subTaskQueryResponses" :key="subIndex" class="list-group-item">
              <span>{{ subitem.name }}</span>
              <i v-if="subitem.subTaskStatus == 'TODO'" class="bi bi-circle mx-1"></i>
              <i v-if="subitem.subTaskStatus == 'PROGRESS'" class="bi bi-dash-circle mx-1"></i>
              <i v-if="subitem.subTaskStatus == 'DONE'" class="bi bi-check-circle mx-1"></i>
            </li>
          </ul>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  props: {
    items: Array,
  },
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>

<style scoped>
@media screen and (max-width: 700px) {
  span {
    font-size: 2.2vw;
  }

  .label-text {
    font-size: 1.5vw;
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
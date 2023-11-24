<template>  
  <div class="d-flex justify-content-center mb-4 my-5">
      <button @click="prevDay" class="btn btn-secondary me-4">
        <i class="bi bi-caret-left-fill"></i>
      </button>
      <h2 class="me-4">{{ month }}월 {{ day }}일 {{ year }}년</h2>
      <button @click="nextDay" class="btn btn-secondary">
        <i class="bi bi-caret-right-fill"></i>
      </button>
  </div>

  <div class="container mb-2">
    <div class="row">
      <div class="col">
        <div class="bg-secondary my-4 py-1 text-white">
          <div class="text-end pb-3">
            <span class="mx-2 d-inline-block">총 공부 시간 : 6시간 20분</span>
            <span class="mx-2 d-inline-block">총 점수 : {{ totalScore }}</span>
            <span class="mx-2 d-inline-block">성취도 : {{ achievement }}%</span>
            <span class="mx-2 d-inline-block">메인 태그 : {{ mainTag }}</span>
          </div>

          <div class="d-flex justify-content-center pb-2 wrap">
            <div v-for="tag in tags" :key="tag" class="oval-label mx-2">
              <span class="label-text">{{ tag }}</span>
            </div>
          </div> 

        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-6 my-3">
        <h4>To Do</h4>
        <ul class="list-group">
          <li v-for="(item, index) in items" :key="index" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold">{{ item.text }}</span>
              <div>
                <div class="oval-label mx-2">
                  <span class="label-text">상태</span>
                </div>
                <div class="oval-label mx-2">
                  <span class="label-text">우선 순위</span>
                </div>
                <div class="oval-label mx-2">
                  <span class="label-text">어려움</span>
                </div>
                <div class="oval-label mx-2">
                  <span class="label-text">중요도</span>
                </div>
              </div>
            </div>
            <ul v-if="item.subitems" class="list-group mt-2 list-group-flush">
              <li v-for="(subitem, subIndex) in item.subitems" :key="subIndex" class="list-group-item">
                <span>{{ subitem }}</span>
                <div class="oval-label mx-4">
                  <span class="label-text">상태</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="col-md-6 my-3">
        <TimeTable/>
      </div>
    </div>
  </div>

  <div class="container py-4 my-4 end-box">
    <div class="row">
      <div class="col-md-4 my-3">
        <MemoList/>
      </div>
      <div class="col-md-8 my-3">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h4>Review</h4>
            <i class="bi bi-list"></i>
          </div>
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. 
              Some quick example text to build on the card title and make up the bulk of the card's content. 
              Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
    </div>
   </div>
</template>

<script>
import TimeTable from "./TimeTable.vue";
import MemoList from "./MemoList.vue";

export default {
  name: 'Schedule',
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      totalScore: 15,
      achievement: 78,
      mainTag: '메인 태그',
      tags: [
        'YourTextHere','YourTextHere','YourTextHere','YourTextHere',
        
      ],
      items: [
        { text: 'An item', subitems: ['Subitem 1', 'Subitem 2'] },
        { text: 'A second item', subitems: ['Subitem 1', 'Subitem 2'] },
        { text: 'A third item' },
        { text: 'A fourth item', subitems: ['Subitem 1', 'Subitem 2'] },
        { text: 'And a fifth one' },
      ],
    };
  },
  methods: {
    prevDay() {
      const currentDate = new Date(this.year, this.month - 1, this.day);
      currentDate.setDate(currentDate.getDate() - 1);

      this.year = currentDate.getFullYear();
      this.month = currentDate.getMonth() + 1;
      this.day = currentDate.getDate();
    },

    nextDay() {
      const currentDate = new Date(this.year, this.month - 1, this.day);
      currentDate.setDate(currentDate.getDate() + 1);

      this.year = currentDate.getFullYear();
      this.month = currentDate.getMonth() + 1;
      this.day = currentDate.getDate();
    },
  },
  components: {
    TimeTable : TimeTable,
    MemoList : MemoList,
  }
}
</script>

<style scoped>
.btn {
  --bs-btn-font-size: 1.25vw;
}
.oval-label {
  display: inline-block;
  background-color: white;
  color: #333;
  border-radius: 8px;
  padding: 2px 4px;
  border: 1px solid #3c3c3c;
}

.label-text {
  display: block;
  text-align: center;
  font-size: 0.6vw;
  font-weight: bold;
}

.d-flex.wrap {
  flex-wrap: wrap;
  gap: 10px;
}

.end-box {
  background-color: #787878;
  border-radius: 10px;
}

@media screen and (max-width: 700px) {
  span {
    font-size: 2.2vw;
  }

  p {
    font-size: 2.2vw;
  }

  .label-text {
  font-size: 1.5vw;
  }
}
</style>

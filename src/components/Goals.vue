<template>
  <div class="container my-5">
    <div class="d-flex align-items-center justify-content-between mb-2">
      <h5 class="container-name">목표 리스트</h5>
      <button @click="showAllGoals" class="btn btn-secondary">
        <i class="bi bi-list"></i>
      </button>
    </div>

    <div class="row">
      <div v-for="(goal, index) in visibleGoals" :key="index" class="col-6">
        <div class="accordion" :id="'accordionExample' + index">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                :data-bs-toggle="'collapse'"
                :data-bs-target="'#collapse' + index"
                :aria-expanded="false"
                :aria-controls="'collapse' + index"
              >
                {{ goal.name }}
              </button>
            </h2>
            <div
              :id="'collapse' + index"
              class="accordion-collapse collapse"
              :data-bs-parent="'#accordionExample' + index"
            >
              <div class="accordion-body">
                <div v-for="(subGoal, index) in goal.subGoals" :key="index">
                  {{ subGoal.name }}
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
export default {
  data() {
    return {
      goals: [
        { name: '목표 1', subGoals: [{name : '서브 1-1'}, {name :'서브 1-2'}], showSubGoals: false },
        { name: '목표 2', subGoals: [{name : '서브 2-1'}, {name :'서브 2-2'}], showSubGoals: false },
        { name: '목표 3', subGoals: [{name : '서브 3-1'}, {name :'서브 3-2'}], showSubGoals: false },
        { name: '목표 1', subGoals: [{name : '서브 1-1'}, {name :'서브 1-2'}], showSubGoals: false },
        { name: '목표 2', subGoals: [{name : '서브 2-1'}, {name :'서브 2-2'}], showSubGoals: false },
        { name: '목표 3', subGoals: [{name : '서브 3-1'}, {name :'서브 3-2'}], showSubGoals: false },
        { name: '목표 3', subGoals: [{name : '서브 3-1'}, {name :'서브 3-2'}], showSubGoals: false },
      ],
      showAll: false, // "더 보기" 버튼을 클릭하면 true로 변경
    };
  },
  computed: {
    // 보여질 목표의 개수 계산
    visibleGoals() {
      return this.showAll ? this.goals : this.goals.slice(0, 2);
    },
  },
  methods: {
    // "더 보기" 버튼 클릭 시 모든 목표 표시
    showAllGoals() {
      this.showAll = !this.showAll;
    },
  },
};
</script>

<style scoped>
 .container {
  width: 80%;
 }

 @media screen and (max-width: 700px) { 
  .container {
    font-size: 1.2vw;
  }

  .container-name {
    font-size: 3.0vw;
  }

  .btn {
    font-size: 2.0vw;
  }

  .accordion-button {
    padding: 4% 8%;
    font-size: 2.5vw;
  }

  .accordion-body {
    font-size: 2.0vw;
  }

}
</style>

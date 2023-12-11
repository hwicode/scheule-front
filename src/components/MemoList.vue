<template>
  <!-- Modal -->
  <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="exampleModalLabel">Memo List</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li v-for="(memo, index) in memos" :key="index" class="list-group-item text-break border-primary">
              {{ memo.text }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header d-flex align-items-center justify-content-between">
      <h4 class="h4-responsive">Memo List</h4>
      <button class="btn btn-sm border-dark border-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="bi bi-list"></i>
      </button>
    </div>
    <ul class="list-group list-group-flush">
      <li v-for="(memo, index) in visibleMemos" :key="index" class="list-group-item limited-charactor">
        {{ memo.text }}
      </li>  
    </ul>
  </div>
</template>

<script>
import { getMemos } from '@/api/memo-list.js';

export default {
  name: 'MemoList',
  props: {
    dailyScheduleId: Number,
  },
  data() {
    return {
      memos: [],
    };
  },
  computed: {
    visibleMemos() {
      return this.memos.slice(0, 3);
    },
  },
  watch: {
    dailyScheduleId() {
      if (this.dailyScheduleId !== 0) {
        this.fetchMemos();
      }
    },
  },
  methods: {

    async fetchMemos() {
      try {
        const response = await getMemos(this.dailyScheduleId);
        this.memos = response.data;
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

  },
};
</script>

<style>

  .limited-charactor {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media screen and (max-width: 700px) {
    .h4-responsive {
      font-size: 4vw;
    }

    .list-group-item {
      font-size: 2.2vw;
    }
  }
</style>

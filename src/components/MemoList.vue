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
              <div class="name-hover" data-bs-toggle="dropdown">{{ memo.text }}</div>
              <ul class="dropdown-menu text-center" style="width: 50%;">
                <li @click="showMemoChangeForm(memo)" class="dropdown-item" style="cursor: pointer;">메모 변경</li>
                <li><hr class="dropdown-divider"></li>
                <li @click="showMemoAddTagsForm(memo)" class="dropdown-item" style="cursor: pointer;">메모 태그 추가</li>
                <li><hr class="dropdown-divider"></li>
                <li @click="showMemoDeleteForm(memo)" class="dropdown-item" style="cursor: pointer;">메모 삭제</li>
              </ul>

              <div v-if="memo.showMemoChangeForm" class="border px-1 py-1 my-2">
                <form @submit.prevent="changeMemoText(memo)">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <label class="form-label fw-bold">메모 변경</label>
                    <button @click="memo.showMemoChangeForm = !memo.showMemoChangeForm;" type="button" class="btn-close"></button>
                  </div>
                  <textarea v-model="newMemoText" class="form-control mb-3" rows="3" required></textarea>
                  <div class="text-center">
                    <button type="submit" class="btn btn-secondary form-btn">확인</button>
                  </div>
                </form>
                <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
              </div>

              <div v-if="memo.showMemoAddTagsForm" class="border px-1 py-1 my-2">
                <form @submit.prevent="addTagsToMemo(memo)">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <label class="form-label fw-bold">메모 태그 추가</label>
                    <button @click="memo.showMemoAddTagsForm = !memo.showMemoAddTagsForm;" type="button" class="btn-close"></button>
                  </div>

                  <div class=" mb-1">
                    <label class="form-label fw-bold">태그 : {{ this.tags }}</label>
                    <div class="input-group">
                      <select @change="this.selectedTag = $event.target.value" class="form-select">
                        <option v-for="(tag, index) in allTags" :key="index" class="form-control">{{ tag.name }}</option>
                      </select>
                      <button @click="addTag" type="button" class="btn btn-secondary form-btn">추가</button>
                    </div>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-secondary form-btn">확인</button>
                  </div>
                </form>
                <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
              </div>

              <div v-if="memo.showMemoDeleteForm" class="border px-1 py-1 my-2">
                <form @submit.prevent="deleteMemo(memo)">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <label class="form-label fw-bold">메모 삭제</label>
                    <button @click="memo.showMemoDeleteForm = !memo.showMemoDeleteForm;" type="button" class="btn-close"></button>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-secondary form-btn">삭제</button>
                  </div>
                </form>
                <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
              </div>

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
      <div class="d-flex align-items-center">
        <h4 class="h4-responsive">Memo List</h4>
        <button @click="showMemoForm" class="btn px-1">
          <i class="bi bi-plus fs-4"></i>
        </button>  
      </div>
      <button class="btn btn-sm border-dark border-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="bi bi-list"></i>
      </button>
    </div>

    <div v-if="isShowMemoForm" class="border px-1 py-1" style="background-color: white;">
        <form @submit.prevent="createMemo">
          <div class="d-flex justify-content-between mb-1">
            <label class="form-label fw-bold">메모 추가</label>
            <button @click="isShowMemoForm = !isShowMemoForm" type="button" class="btn-close"></button>
          </div>
          <textarea v-model="newMemoText" class="form-control mb-3" rows="4" required></textarea>

          <div class="form-check my-1">
            <input @click="showTagsInMemoForm" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              메모에 태그 추가하기
            </label>
          </div>
          <div v-if="isShowTagsInMemoForm" class=" mb-1">
            <label class="form-label fw-bold">태그 : {{ this.tags }}</label>
            <div class="input-group">
              <select @change="this.selectedTag = $event.target.value" class="form-select">
                <option v-for="(tag, index) in allTags" :key="index" class="form-control">{{ tag.name }}</option>
              </select>
              <button @click="addTag" type="button" class="btn btn-secondary form-btn">추가</button>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-secondary form-btn">확인</button>
          </div>
        </form>
        <AlertWarning @turnOff="isTagDuplicatedAlert = $event" message="메모에 태그가 중복되었습니다." :isVisible="isTagDuplicatedAlert"/>
        <AlertWarning @turnOff="isNotValidNumberOfTagsAlert = $event" message="메모에 한 번에 추가할 수 있는 최대 태그의 수는 10개입니다." :isVisible="isNotValidNumberOfTagsAlert"/>
        <AlertServerError @turnOff="isServerErrorAlert = $event" :isVisible="isServerErrorAlert"/>
      </div>

    <ul class="list-group list-group-flush">
      <li v-for="(memo, index) in visibleMemos" :key="index" class="list-group-item limited-charactor">
        {{ memo.text }}
      </li>  
    </ul>
  </div>
</template>

<script>
import {
  getMemos, saveMemoApi, saveMemoWithTagsApi, changeMemoTextApi, 
  addTagsToMemoApi, deleteMemoApi 
} from '@/api/memo-list.js';

import AlertWarning from "@/components/basic/AlertWarning.vue";
import AlertServerError from "@/components/basic/AlertServerError.vue";

export default {
  name: 'MemoList',
  components: {
    AlertWarning: AlertWarning,
    AlertServerError: AlertServerError,
  },
  props: {
    dailyScheduleId: Number,
  },
  data() {
    return {
      memos: [],
      tags: [],

      newMemoText: '',
      selectedTag: null,

      isShowMemoForm: false,
      isShowTagsInMemoForm: false,
      
      isServerErrorAlert: false,
      isTagDuplicatedAlert: false,
      isNotValidNumberOfTagsAlert: false,
    };
  },
  computed: {
    visibleMemos() {
      return this.memos.slice(0, 3);
    },

    allTags() {
      return this.$store.state.tags.tags;
    },

    tagsMap() {
      return this.$store.state.tags.tagsMap;
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
    showMemoForm() {
      this.isShowMemoForm = !this.isShowMemoForm;
      this.isShowTagsInMemoForm = false;
    },

    showTagsInMemoForm() {
      this.tags = [];
      this.isShowTagsInMemoForm = !this.isShowTagsInMemoForm;
    },

    showMemoChangeForm(memo) {
      this.closeAllMemoChangeForm();
      this.newMemoText = '';
      memo.showMemoChangeForm = !memo.showMemoChangeForm;
    },

    closeAllMemoChangeForm() {
      this.memos.forEach(memo => memo.showMemoChangeForm = false);
    },

    showMemoAddTagsForm(memo) {
      this.closeAllMemoAddTagsForm();
      this.tags = [];
      memo.showMemoAddTagsForm = !memo.showMemoAddTagsForm;
    },

    closeAllMemoAddTagsForm() {
      this.memos.forEach(memo => memo.showMemoAddTagsForm = false);
    },

    showMemoDeleteForm(memo) {
      this.closeAllMemoDeleteForm();
      memo.showMemoDeleteForm = !memo.showMemoDeleteForm;
    },

    closeAllMemoDeleteForm() {
      this.memos.forEach(memo => memo.showMemoDeleteForm = false);
    },

    addTag() {
      if (!this.selectedTag) {
        this.selectedTag = this.allTags[0].name;
      }
      this.tags.push(this.selectedTag);
      this.selectedTag = null;
    },

    async fetchMemos() {
      try {
        const response = await getMemos(this.dailyScheduleId);
        this.memos = response.data.map(memo => this.initializeMemo(memo));
      } catch (error) {
        console.log(`오류가 발생했습니다: ${error.message}`);
      }
    },

    initializeMemo(memo) {
      return {
        ...memo,
        showMemoChangeForm: false,
        showMemoAddTagsForm: false,
        showMemoDeleteForm: false,
      };
    },

    createMemo() {
      if (this.isShowTagsInMemoForm) {
        return this.addMemoWithTags();
      }
      this.addMemo();
    },

    async addMemoWithTags() {
      if (this.tags.length === 0) {
        this.isTagDuplicatedAlert = true;
        return;
      }

      try {
        const response = await saveMemoWithTagsApi( 
          {
            dailyTagListId: this.dailyScheduleId,
            text: this.newMemoText,
            tagIds: this.tags.map(tag => this.tagsMap.get(tag).id)
          } 
        );
        const newMemo = {
          id: response.data.memoId,
          text: response.data.text,
        }
        this.memos.push(this.initializeMemo(newMemo));
        this.isShowMemoForm = false;
        this.newMemoText = '';
        this.isShowTagsInMemoForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async addMemo() {
      try {
        const response = await saveMemoApi( 
          {
            dailyTagListId: this.dailyScheduleId,
            text: this.newMemoText,
          } 
        );
        const newMemo = {
          id: response.data.memoId,
          text: response.data.text,
        }
        this.memos.push(this.initializeMemo(newMemo));
        this.isShowMemoForm = false;
        this.newMemoText = '';
        this.isShowTagsInMemoForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async changeMemoText(memo) {
      try {
        const response = await changeMemoTextApi( {
          memoId: memo.id,
          newText: this.newMemoText
        });
        memo.text = response.data.newText;
        this.newMemoText = '';
        memo.showMemoChangeForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },
    
    async addTagsToMemo(memo) {
      try {
        await addTagsToMemoApi( 
          {
            memoId: memo.id,
            tagIds: this.tags.map(tag => this.tagsMap.get(tag).id)
          } 
        );
        memo.showMemoAddTagsForm = false;
      } catch (error) {
        this.handleServerError(error);
      }
    },

    async deleteMemo(memo) {
      try {
        await deleteMemoApi(memo.id);
        this.memos = this.memos.filter(item => item.id !== memo.id);
        memo.showMemoDeleteForm = false;
      } catch (error) {
        this.handleServerError(error);
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

    .form-btn {
      font-size: 1.25vw;
      padding: 2px 4px;
    }
  }
</style>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const searchNo = route.params.no
const board = ref({})
const comment = ref([])

const getBoardDetail = async () => {
  const result = await axios.get(`/api/board/${searchNo}`);
  board.value = result.data[0];
}

const getComment = async () => {
  const result = await axios.get(`/api/comment/${searchNo}`);
  comment.value = result.data;
}

const hasComments = computed(() => {
  return Array.isArray(comment.value) && comment.value.length > 0;
});

function getDateFormat(dateString) {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    'Error : 유효하지 않은 날짜';
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function updateBoard(boardNo) {
  router.push(`/boardform/${boardNo}`);
}

onMounted(() => {
  getBoardDetail();
  getComment();
});
</script>
<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col" class="text-center table-primary">번호</th>
          <td scope="col" class="text-center">{{ board.no }}</td>
          <th scope="col" class="text-center table-primary">작성일(수정일)</th>
          <td scope="col" class="text-center">
            {{ getDateFormat(board.created_dt) }}
          </td>
          <th scope="col" class="text-center table-primary">이름</th>
          <td scope="col" class="text-center">{{ board.writer }}</td>
        </tr>

        <tr>
          <th colspan="2" class="text-center table-primary">제목</th>
          <td colspan="4">{{ board.title }}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="6" class="text-left" valign="top" height="200">
            <pre style="white-space: pre-wrap;
                  border: none;
                  background-color: white; ">{{ board.content }}</pre>
          </td>
        </tr>
        <tr>
          <td colspan="6" class="text-center">
            <button @click="updateBoard(board.no)" class="btn btn-xs btn-info">
              수정
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <table v-if="hasComments" class="table table-bordered">
      <thead>댓글 목록</thead>
      <tbody>
        <tr v-for="cmt in comment" :key="cmt.no">
          <td>{{ cmt.content }}</td>
          <td>{{ cmt.writer }}</td>
          <td>{{ getDateFormat(cmt.created_dt) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="container">댓글 없음</div>
  </div>
</template>
<style></style>
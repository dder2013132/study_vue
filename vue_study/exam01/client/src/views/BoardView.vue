<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const boardList = ref([]);
const commentCounts = ref({});

const getBoardList = async()=>{
  let result = await axios.get(`/api/board`);
  boardList.value = result.data;
  getCommentCounts();
};

const getCommentCounts = async () => {
  for (const board of boardList.value) {
    const boardNo = board.no;
    const result = await axios.get(`/api/comment/${boardNo}/count`);
    commentCounts.value[boardNo] = result.data.count;
  }
};

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

function gotoDetail(boardId){
  router.push(`/boardinfo/${boardId}`);
}
onMounted(() => {
  getBoardList();
});
</script>
<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>댓글 수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="board in boardList" :key="board.no" @click="gotoDetail(board.no)">
          <td>{{ board.no }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ getDateFormat(board.created_dt) }}</td>
          <td>{{ commentCounts[board.no]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
  
</style>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const board = ref({
  no: '',
  title: '',
  writer: '',
  content: '',
  created_dt: ''
});

const isNew = ref(true);
const getBoardDetails = async () => {
  const boardNo = route.params.no;
  if (boardNo && boardNo !== 'new') {
    isNew.value = false;
    const result = await axios.get(`/api/board/${boardNo}`);
    board.value = result.data[0];
  } else {
    isNew.value = true;
    board.value = {
      title: '',
      writer: '',
      content: ''
    }
  }
}

const saveBoard = async () => {
  if (!board.value.title || !board.value.writer) {
    alert('제목과 저자는 필수로 작성하세요.');
    return;
  }
  const boardData = {
    title: board.value.title.trim(),
    writer: board.value.writer.trim(),
    content: board.value.content || ''
  };
  await axios.post('/api/board', boardData);
  let result;
  if (isNew.value) {
    // 신규 등록
    result = await axios.post('/api/board', boardData);
    alert('게시판 등록 완료');
  } else {
    // 수정
    const boardNo = route.params.no;
    result = await axios.put(`/api/board/${boardNo}`, boardData);
    alert('게시판 수정 완료');
  }
}


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

onMounted(() => {
  getBoardDetails();
})

</script>
<template>
  <div class="container">
    <h2>{{ isNew ? '새 책 등록하기' : '책 정보 수정하기' }}</h2>
    <form @submit.prevent="saveBoard">
      <label for="no">No.</label>
      <input v-model="board.no" type="text" id="no" readonly />

      <label for="title">제목</label>
      <input v-model="board.title" type="text" id="title" required />

      <label for="writer">저자</label>
      <input v-model="board.writer" type="text" id="writer" required />

      <label for="content">책 설명</label>
      <textarea v-model="board.content" id="content" style="height: 200px"></textarea>

      <label for="regdate">작성일자</label>
      <input :value="getDateFormat(board.created_date || new Date())" type="text" readonly />

      <div class="btn-group">
        <button type="submit" class="btn">저장</button>
        <button type="button" @click="router.push('/boardlist')" class="btn btn-secondary">돌아가기</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

input[type="text"], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

.btn {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.btn:hover {
  background-color: #45a049;
}
</style>
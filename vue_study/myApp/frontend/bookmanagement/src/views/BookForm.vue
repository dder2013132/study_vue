<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const book = ref({
  id: '',
  title: '',
  writer: '',  // DB 필드명이 author였던 것 같은데, 맞춰서 수정해야 할 수도 있어!
  content: '',
  createdDate: ''
});
const isNew = ref(true); // 신규 등록인지 수정인지 구분

// 책 정보 가져오기
const fetchBook = async () => {
  const bookID = route.params.id;
  if (bookID && bookID !== 'new') {
    try {
      isNew.value = false; // 수정 모드로 설정
      const result = await axios.get(`/api/books/${bookID}`);
      // 데이터가 배열로 오는지 확인 (API 응답 형식에 따라 달라질 수 있음)
      if (Array.isArray(result.data) && result.data.length > 0) {
        book.value = result.data[0];
      } else {
        book.value = result.data; // 객체로 바로 옴
      }
      console.log('불러온 책 정보:', book.value);
    } catch (error) {
      console.error('책 정보 불러오기 실패ㅠㅠ:', error);
      alert('책 정보를 불러오는데 실패했어ㅜㅜ');
    }
  } else {
    // 신규 등록 모드일 때는 빈 폼으로 초기화
    isNew.value = true;
    book.value = {
      id: '',
      title: '',
      writer: '',
      content: '',
      createdDate: new Date().toLocaleDateString() // 오늘 날짜로 설정
    };
  }
};

// 저장 기능
const saveBook = async () => {
  try {
    if (!book.value.title || !book.value.writer) {
      alert('제목과 저자는 필수 입력 사항이야!');
      return;
    }
    
    let result;
    if (isNew.value) {
      // 신규 등록
      result = await axios.post('/api/books', book.value);
      alert('책 정보가 등록됐어! 👍');
    } else {
      // 수정
      result = await axios.put(`/api/books/${book.value.id}`, book.value);
      alert('책 정보가 수정됐어! ✨');
    }
    console.log('저장 결과:', result.data);
    
    // 목록 페이지로 이동
    router.push('/booklist');
  } catch (error) {
    console.error('책 정보 저장 실패:', error);
    alert('책 정보 저장에 실패했어ㅠㅠ 다시 시도해줄래?');
  }
};

// 페이지 로드 시 책 정보 가져오기
onMounted(() => {
  fetchBook();
});
</script>

<template>
  <div class="container">
    <h2>{{ isNew ? '새 책 등록하기' : '책 정보 수정하기' }}</h2>
    <form @submit.prevent="saveBook">
      <label for="no">No.</label>
      <input v-model="book.id" type="text" id="no" readonly />

      <label for="title">제목</label>
      <input v-model="book.title" type="text" id="title" required />

      <label for="writer">저자</label>
      <input v-model="book.author" type="text" id="writer" required />

      <label for="content">책 설명</label>
      <textarea v-model="book.description" id="content" style="height: 200px"></textarea>

      <label for="regdate">작성일자</label>
      <input v-model="book.created_at" type="text" readonly />

      <div class="btn-group">
        <button type="submit" class="btn">저장</button>
        <button type="button" @click="router.push('/booklist')" class="btn btn-secondary">돌아가기</button>
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

h2 {
  color: #04aa6d;
  margin-bottom: 20px;
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

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
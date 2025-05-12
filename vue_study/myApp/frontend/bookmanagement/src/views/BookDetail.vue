<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const bookData = ref({});
const isLoading = ref(false);

// 날짜 포맷 함수
const getDateFormat = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 도서 상세 정보 가져오기
const getBookDetail = async () => {
  isLoading.value = true;
  try {
    // URL 파라미터에서 id 가져오기
    const id = route.params.id;
    const result = await axios.get(`/api/books/id/${id}`);
    
    console.log('도서 상세 정보:', result.data);
    
    // 결과가 배열인 경우 첫 번째 항목 사용
    if (Array.isArray(result.data) && result.data.length > 0) {
      bookData.value = result.data[0];
    } else {
      bookData.value = result.data || {};
    }
  } catch (error) {
    console.error('도서 상세 정보를 가져오는 중 오류 발생:', error);
    alert('도서 정보를 불러오는데 실패했어요 ㅠㅠ');
  } finally {
    isLoading.value = false;
  }
};

// 도서 수정 페이지로 이동
const updateBook = (id) => {
  router.push(`/bookupdate/${id}`);
};

// 목록으로 돌아가기
const returnToList = () => {
  router.push('/booklist');
};

// 컴포넌트 마운트 시 도서 정보 가져오기
onMounted(() => {
  getBookDetail();
});
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">📖 도서 상세 정보</h2>
    
    <div v-if="isLoading" class="text-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">로딩 중...</span>
      </div>
      <p class="mt-2">도서 정보를 불러오는 중이에요...</p>
    </div>
    
    <div v-else>
      <div class="book-image-container mb-4" v-if="bookData.image_url">
        <img :src="bookData.image_url" alt="책 표지" class="book-cover">
      </div>
      
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th class="text-center table-primary" width="15%">ID</th>
            <td class="text-center" width="35%">{{ bookData.id || '-' }}</td>
            <th class="text-center table-primary" width="15%">ISBN</th>
            <td class="text-center" width="35%">{{ bookData.isbn || '-' }}</td>
          </tr>
          
          <tr>
            <th class="text-center table-primary">제목</th>
            <td colspan="3" class="text-left">{{ bookData.title || '-' }}</td>
          </tr>
          
          <tr>
            <th class="text-center table-primary">작가</th>
            <td>{{ bookData.author || '-' }}</td>
            <th class="text-center table-primary">출판사</th>
            <td>{{ bookData.publisher || '-' }}</td>
          </tr>
          
          <tr>
            <th class="text-center table-primary">등록일</th>
            <td>{{ getDateFormat(bookData.created_at) }}</td>
            <th class="text-center table-primary">수정일</th>
            <td>{{ getDateFormat(bookData.updated_at) }}</td>
          </tr>
          
          <tr>
            <th class="text-center table-primary align-middle">설명</th>
            <td colspan="3" class="text-left" style="min-height: 200px;">
              <pre class="description-pre">{{ bookData.description || '설명이 없습니다.' }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="button-container text-center mt-4">
        <button @click="updateBook(bookData.id)" class="btn btn-info me-2">
          수정하기
        </button>
        <button @click="returnToList" class="btn btn-secondary">
          목록으로
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-image-container {
  text-align: center;
}

.book-cover {
  max-width: 200px;
  max-height: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.description-pre {
  white-space: pre-wrap;
  border: none;
  background-color: transparent;
  padding: 15px;
  min-height: 150px;
  font-family: inherit;
}

.button-container {
  margin-top: 20px;
  margin-bottom: 40px;
}

.table th {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .table th, .table td {
    padding: 8px;
    font-size: 0.9rem;
  }
}
</style>
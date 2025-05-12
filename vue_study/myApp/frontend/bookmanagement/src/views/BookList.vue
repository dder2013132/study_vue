<script setup>
import axios from 'axios';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const bookList = ref([]);
const searchType = ref('title'); // 기본 검색 타입은 제목으로 설정
const searchText = ref('');
const isLoading = ref(false);

// 페이징 관련 변수
const currentPage = ref(1);
const itemsPerPage = ref(5); // 한 페이지에 보여줄 항목 수
const totalItems = ref(0);

// 페이지별 도서 목록 계산
const paginatedBooks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return bookList.value.slice(startIndex, endIndex);
});

// 총 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value);
});

// 페이지 번호 배열 생성 (최대 5개 페이지 버튼 표시)
const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;
  
  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});

// 페이지 변경 함수
const changePage = (page) => {
  currentPage.value = page;
  window.scrollTo(0, 0); // 페이지 상단으로 스크롤
};

// 도서 목록 가져오기
const getBookList = async () => {
  try {
    isLoading.value = true;
    const result = await axios.get('/api/books');
    
    console.log('전체 도서 목록 결과:', result.data);
    
    if (result.data && Array.isArray(result.data)) {
      bookList.value = result.data;
    } else if (result.data) {
      // 데이터가 있지만 배열이 아닌 경우(객체인 경우)
      bookList.value = [result.data];
    } else {
      bookList.value = [];
    }
    
    totalItems.value = bookList.value.length;
  } catch (error) {
    console.error('도서 목록을 가져오는 중 오류 발생:', error);
    console.error('에러 세부 정보:', error.response ? error.response.data : error.message);
    alert('도서 목록을 불러오는데 실패했어요 ㅠㅠ');
    bookList.value = [];
  } finally {
    isLoading.value = false;
  }
};

// 검색 결과 가져오기
const searchBooks = async () => {
  if (!searchText.value.trim()) {
    getBookList(); // 검색어가 비어있으면 전체 목록 가져오기
    return;
  }
  
  try {
    isLoading.value = true;
    // API 라우터 구조에 맞게 경로 수정
    // "/title/:title", "/author/:author" 등의 형태로 요청해야 함
    let result;
    
    console.log(`검색 타입: ${searchType.value}, 검색어: ${searchText.value}`);
    
    switch(searchType.value) {
      case 'title':
        result = await axios.get(`/api/books/title/${searchText.value}`);
        break;
      case 'author':
        result = await axios.get(`/api/books/author/${searchText.value}`);
        break;
      case 'publisher':
        result = await axios.get(`/api/books/publisher/${searchText.value}`);
        break;
      case 'isbn':
        result = await axios.get(`/api/books/isbn/${searchText.value}`);
        break;
      case 'id':
        result = await axios.get(`/api/books/id/${searchText.value}`);
        break;
      default:
        result = await axios.get(`/api/books/title/${searchText.value}`);
    }
    
    // 결과가 배열이 아닌 경우(단일 객체) 배열로 변환
    if (result.data && !Array.isArray(result.data)) {
      bookList.value = [result.data];
    } else {
      bookList.value = result.data || [];
    }
    
    totalItems.value = bookList.value.length;
    currentPage.value = 1; // 검색 시 첫 페이지로 이동
    console.log('검색 결과:', result.data);
  } catch (error) {
    console.error('도서 검색 중 오류 발생:', error);
    alert('검색에 실패했어요 ㅠㅠ 콘솔을 확인해보세요!');
    bookList.value = []; 
    totalItems.value = 0;
  } finally {
    isLoading.value = false;
  }
};

// 도서 삭제하기
const deleteBook = async (id) => {
  if (!confirm('정말로 이 책을 삭제할까요?')) return;
  
  try {
    await axios.delete(`/api/books/${id}`);
    alert('도서가 삭제되었어요!');
    getBookList(); // 목록 새로고침
  } catch (error) {
    console.error('도서 삭제 중 오류 발생:', error);
    alert('삭제에 실패했어요 ㅠㅠ');
  }
};

// 도서 상세 페이지로 이동
const viewBookDetail = (id) => {
  router.push(`/bookdetail/${id}`);
};

// 한 페이지당 표시할 항목 수 변경
const changeItemsPerPage = (value) => {
  itemsPerPage.value = parseInt(value);
  currentPage.value = 1; // 첫 페이지로 이동
};

// 검색어가 변경될 때마다 자동 검색 (디바운싱 적용)
let searchTimeout;
watch(searchText, (newValue) => {
  clearTimeout(searchTimeout);
  if (newValue.trim()) {
    searchTimeout = setTimeout(() => {
      searchBooks();
    }, 500); // 500ms 디바운싱
  } else if (newValue === '') {
    getBookList();
  }
});

// 컴포넌트 마운트 시 도서 목록 가져오기
onMounted(() => {
  getBookList();
});
</script>

<template>
  <div class="container">
    <h1 class="title">📚 도서 관리 시스템</h1>
    
    <div class="search-container">
      <select v-model="searchType" class="form-select select-search">
        <option value="title">제목</option>
        <option value="author">작가</option>
        <option value="publisher">출판사</option>
        <option value="isbn">ISBN</option>
        <option value="id">ID</option>
      </select>
      <input 
        class="form-control input-search" 
        type="text" 
        v-model="searchText"
        :placeholder="`${searchType === 'title' ? '도서명' : searchType === 'author' ? '작가명' : searchType === 'publisher' ? '출판사' : searchType === 'isbn' ? 'ISBN' : 'ID'}을(를) 입력하세요`" 
        @keyup.enter="searchBooks"
      >
      <button class="btn btn-success btn-search" @click="searchBooks">검색</button>
    </div>
    
    <div class="row mb-3 align-items-center">
      <div class="col-md-6">
        <span v-if="totalItems > 0" class="text-muted">
          전체 {{ totalItems }}개 중 {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, totalItems) }}개 표시 중
        </span>
      </div>
      <div class="col-md-6 text-end">
        <div class="d-inline-block me-2">
          <label for="itemsPerPage" class="me-1">페이지당 항목:</label>
          <select id="itemsPerPage" v-model="itemsPerPage" class="form-select form-select-sm d-inline-block w-auto" @change="changeItemsPerPage($event.target.value)">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
    
    <div v-if="isLoading" class="text-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">로딩 중...</span>
      </div>
      <p class="mt-2">도서 정보를 불러오는 중이에요...</p>
    </div>
    
    <div v-else>
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead class="table-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">제목</th>
              <th scope="col">작가</th>
              <th scope="col">출판사</th>
              <th scope="col">ISBN</th>
              <th scope="col">등록일자</th>
              <th scope="col">관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginatedBooks.length === 0">
              <td colspan="7" class="text-center py-4 text-muted">
                <i class="bi bi-emoji-frown me-2"></i>검색 결과가 없어요 😥
              </td>
            </tr>
            <tr v-for="book in paginatedBooks" :key="book.id" @click="viewBookDetail(book.id)" class="book-row">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.publisher }}</td>
              <td>{{ book.isbn }}</td>
              <td>{{ new Date(book.created_at).toLocaleDateString() }}</td>
              <td class="actions">
                <button class="btn btn-sm btn-primary me-1" @click.stop="router.push(`/bookupdate/${book.id}`)">수정</button>
                <button class="btn btn-sm btn-danger" @click.stop="deleteBook(book.id)">삭제</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 페이지네이션 -->
      <nav aria-label="Page navigation" v-if="totalPages > 1">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(1)" aria-label="First">
              <span aria-hidden="true">&laquo;&laquo;</span>
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          
          <li v-for="page in pageNumbers" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(totalPages)" aria-label="Last">
              <span aria-hidden="true">&raquo;&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div class="d-flex justify-content-between mt-4">
        <div>
          <button class="btn btn-secondary" @click="getBookList()">
            <i class="bi bi-arrow-repeat me-1"></i>새로고침
          </button>
        </div>
        <div>
          <button class="btn btn-success" @click="router.push('/bookadd')">
            <i class="bi bi-plus-circle me-1"></i>새 도서 추가
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
}

.select-search {
  width: auto;
  min-width: 120px;
}

.input-search {
  flex: 1;
}

.book-row {
  cursor: pointer;
}

.book-row:hover {
  background-color: rgba(0, 123, 255, 0.05) !important;
}

.actions button {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.actions button:hover {
  opacity: 1;
}

.pagination {
  margin-top: 20px;
  margin-bottom: 0;
}

.page-link {
  color: #4CAF50;
}

.page-item.active .page-link {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .select-search {
    width: 100%;
  }
  
  .table th, .table td {
    padding: 8px 4px;
    font-size: 0.9rem;
  }
}
</style>
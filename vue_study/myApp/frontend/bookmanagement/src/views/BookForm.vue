<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const book = ref({
  id: '',
  title: '',
  author: '',
  publisher: '',
  description: '',
  isbn: '',
  image_url: '',
  isNew: true
});

const isLoading = ref(false);
const imageFile = ref(null);
const imagePreview = ref('');
const uploadMessage = ref('');

// 날짜 화면 표시용 포맷 함수
const formatDate = (date) => {
  if (!date) return '-';
  date = new Date(date);
  return date.toLocaleString('ko-KR', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit', 
    minute: '2-digit'
  });
};

// 날짜 MySQL 형식으로 변환
const formatDateForDB = (date) => {
  if (!date) return null;
  
  // Date 객체로 변환
  const d = new Date(date);
  
  // MySQL이 이해할 수 있는 형식으로 변환 (YYYY-MM-DD HH:MM:SS)
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 이미지 선택 시 처리
const handleImageSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // 이미지 파일 유효성 검사
  if (!file.type.match('image.*')) {
    uploadMessage.value = '이미지 파일만 업로드 가능합니다.';
    return;
  }
  
  // 파일 크기 제한 (5MB)
  if (file.size > 5 * 1024 * 1024) {
    uploadMessage.value = '이미지 크기는 5MB 이하여야 합니다.';
    return;
  }
  
  imageFile.value = file;
  uploadMessage.value = `'${file.name}' 선택됨 (${(file.size / 1024).toFixed(1)} KB)`;
  
  // 이미지 미리보기 생성
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// 이미지 업로드 처리
const uploadImage = async () => {
  if (!imageFile.value) return null;
  
  try {
    // FormData 생성
    const formData = new FormData();
    formData.append('image', imageFile.value);
    
    // 업로드 API 호출
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // 서버에서 반환된 이미지 URL
    return response.data.imageUrl;
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    alert('이미지 업로드에 실패했습니다.');
    return null;
  }
};

// 도서 정보 불러오기
const loadBookData = async () => {
  const id = route.params.id;
  
  if (id) {
    // 수정 모드
    isLoading.value = true;
    try {
      const response = await axios.get(`/api/books/id/${id}`);
      let data;
      
      // 결과가 배열인 경우 첫 번째 항목 사용
      if (Array.isArray(response.data) && response.data.length > 0) {
        data = response.data[0];
      } else {
        data = response.data;
      }
      
      book.value = { 
        ...data, 
        isNew: false 
      };
      
      // 기존 이미지가 있으면 미리보기 설정
      if (book.value.image_url) {
        imagePreview.value = book.value.image_url;
      }
    } catch (error) {
      console.error('도서 정보를 불러오는 중 오류 발생:', error);
      alert('도서 정보를 불러오는데 실패했습니다.');
      router.push('/booklist');
    } finally {
      isLoading.value = false;
    }
  } else {
    // 신규 등록 모드
    book.value = {
      id: '',
      title: '',
      author: '',
      publisher: '',
      description: '',
      isbn: '',
      image_url: '',
      isNew: true
    };
  }
};

// 도서 저장
const saveBook = async () => {
  // 기본 유효성 검사
  if (!book.value.title || !book.value.author) {
    alert('제목과 작가는 필수 입력항목입니다.');
    return;
  }
  
  isLoading.value = true;
  
  try {
    // 이미지가 선택되었으면 업로드
    let imageUrl = book.value.image_url;
    if (imageFile.value) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }
    
    const { isNew, ...bookData } = book.value;
    
    // 현재 시간을 MySQL 형식으로 변환
    const now = formatDateForDB(new Date());
    
    if (isNew) {
      // 신규 등록
      await axios.post('/api/books', {
        ...bookData,
        image_url: imageUrl,
        created_at: now,
        updated_at: now
      });
      alert('도서가 성공적으로 등록되었습니다!');
    } else {
      // 수정
      await axios.put(`/api/books/${bookData.id}`, {
        ...bookData,
        image_url: imageUrl,
        // 생성일은 그대로 두고, 수정일만 현재 시간으로 업데이트
        created_at: formatDateForDB(bookData.created_at),
        updated_at: now
      });
      alert('도서 정보가 성공적으로 수정되었습니다!');
    }
    
    // 목록 페이지로 이동
    router.push('/booklist');
  } catch (error) {
    console.error('도서 저장 중 오류 발생:', error);
    alert(`도서 ${book.value.isNew ? '등록' : '수정'} 중 오류가 발생했습니다.`);
  } finally {
    isLoading.value = false;
  }
};

// 취소 및 돌아가기
const cancel = () => {
  if (book.value.isNew) {
    router.push('/booklist');
  } else {
    router.push(`/bookdetail/${book.value.id}`);
  }
};

// 컴포넌트 마운트 시 도서 정보 로드
onMounted(() => {
  loadBookData();
});
</script>

<template>
  <div class="container my-4">
    <h2 class="text-center mb-4">
      {{ book.isNew ? '📚 새 도서 등록' : '📝 도서 정보 수정' }}
    </h2>
    
    <div v-if="isLoading" class="text-center p-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">로딩 중...</span>
      </div>
      <p class="mt-2">처리 중입니다...</p>
    </div>
    
    <form v-else @submit.prevent="saveBook" class="book-form">
      <div class="row">
        <div class="col-md-8">
          <div class="mb-3">
            <label for="id" class="form-label">도서 ID</label>
            <input 
              v-model="book.id" 
              type="text" 
              id="id" 
              class="form-control" 
              readonly 
              :disabled="!book.isNew"
              :placeholder="book.isNew ? '자동 생성됩니다' : ''"
            >
          </div>
          
          <div class="mb-3">
            <label for="title" class="form-label">제목 <span class="text-danger">*</span></label>
            <input 
              v-model="book.title" 
              type="text" 
              id="title" 
              class="form-control" 
              required 
              placeholder="도서 제목을 입력하세요"
            >
          </div>
          
          <div class="mb-3">
            <label for="author" class="form-label">작가 <span class="text-danger">*</span></label>
            <input 
              v-model="book.author" 
              type="text" 
              id="author" 
              class="form-control" 
              required 
              placeholder="작가명을 입력하세요"
            >
          </div>
          
          <div class="mb-3">
            <label for="publisher" class="form-label">출판사</label>
            <input 
              v-model="book.publisher" 
              type="text" 
              id="publisher" 
              class="form-control" 
              placeholder="출판사명을 입력하세요"
            >
          </div>
          
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN</label>
            <input 
              v-model="book.isbn" 
              type="text" 
              id="isbn" 
              class="form-control" 
              placeholder="ISBN 번호를 입력하세요"
            >
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="mb-3 text-center">
            <label class="form-label d-block">책 표지</label>
            
            <div class="image-preview-container mb-2">
              <img 
                v-if="imagePreview" 
                :src="imagePreview" 
                alt="책 표지 미리보기" 
                class="img-thumbnail" 
              >
              <div v-else class="image-placeholder">
                <span>이미지 없음</span>
              </div>
            </div>
            
            <div class="mt-2">
              <input
                type="file"
                id="image"
                class="form-control"
                accept="image/*"
                @change="handleImageSelect"
              >
              <small v-if="uploadMessage" class="text-muted">{{ uploadMessage }}</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mb-3">
        <label for="description" class="form-label">설명</label>
        <textarea 
          v-model="book.description" 
          id="description" 
          class="form-control" 
          rows="5" 
          placeholder="도서에 대한 설명을 입력하세요"
        ></textarea>
      </div>
      
      <div v-if="!book.isNew" class="mb-3 row">
        <div class="col-md-6">
          <label class="form-label">등록일</label>
          <input 
            :value="formatDate(book.created_at)" 
            type="text" 
            class="form-control" 
            readonly 
          >
        </div>
        <div class="col-md-6">
          <label class="form-label">수정일</label>
          <input 
            :value="formatDate(book.updated_at)" 
            type="text" 
            class="form-control" 
            readonly 
          >
        </div>
      </div>
      
      <div class="d-flex justify-content-center mt-4 mb-4 gap-3">
        <button type="submit" class="btn btn-primary">
          {{ book.isNew ? '등록하기' : '수정하기' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="cancel">
          취소
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.book-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.image-preview-container {
  width: 150px;
  height: 200px;
  margin: 0 auto;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f0f0f0;
}

.image-preview-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #999;
  font-size: 14px;
}

.form-label {
  font-weight: 500;
}

@media (max-width: 768px) {
  .col-md-4 {
    margin-top: 20px;
  }
  
  .image-preview-container {
    width: 120px;
    height: 160px;
  }
}
</style>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const searchNo = route.params.id
const book = ref([])
const loading = ref(true)
const error = ref(null)

const getBookDetail = async () => {
  try {
    loading.value = true;
    const response = await axios.get(`/api/books/${searchNo}`);
    book.value = response.data[0];
    console.log(searchNo);
  } catch (err) {
    console.error('책 정보를 가져오는데 실패했어ㅠㅠ:', err);
    error.value = '책 정보를 불러올 수 없어 ㅜㅜ';
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.push('/booklist');
}

const gotoCrt = () => {
  router.push(`/bookform/${searchNo}`);
}

onMounted(() => {
  getBookDetail();
});

</script>
      <template>
<div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <button class="btn btn-secondary mb-3" @click="goBack">← 목록으로</button>
      </div>
    </div>

    <!-- 로딩 중일 때 -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">로딩중...</span>
      </div>
      <p>책 정보 불러오는 중... 잠시만~!</p>
    </div>

    <!-- 에러 발생했을 때 -->
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- 책 정보 표시 -->
    <div v-else-if="book" class="card">
      <div class="card-header bg-primary text-white">
        <h2>{{ book.title }}</h2>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <!-- 책 표지 이미지가 있다면 -->
            <img v-if="book.cover_image" :src="book.cover_image" alt="책 표지" class="img-fluid rounded">
            <!-- 이미지가 없다면 기본 이미지 -->
            <div v-else class="bg-light p-5 text-center rounded">
              <span>이미지 없음 ㅠㅠ</span>
            </div>
          </div>
          <div class="col-md-8">
            <table class="table">
              <tbody>
                <tr>
                  <th>작가</th>
                  <td>{{ book.author }}</td>
                </tr>
                <tr>
                  <th>출판사</th>
                  <td>{{ book.publisher }}</td>
                </tr>
                <tr>
                  <th>ISBN</th>
                  <td>{{ book.isbn }}</td>
                </tr>
                <tr>
                  <th>등록일</th>
                  <td>{{ book.created_at }}</td>
                </tr>
                <!-- 책 설명이 있다면 -->
                <tr v-if="book.description">
                  <th>설명</th>
                  <td>{{ book.description }}</td>
                </tr>
              </tbody>
            </table>
            <button @click="gotoCrt()">수정하기</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 책 정보가 없을 때 -->
    <div v-else class="alert alert-warning">
      책 정보를 찾을 수 없어... 😢 다시 확인해볼래?
    </div>
  </div>
</template>
<style></style>
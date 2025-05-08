<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const bookList = ref([]);

const getBookList = async()=>{
  let result = await axios.get(`/api/books`);
  console.log('받은 데이터:', result.data); // 데이터만 확인
  bookList.value = result.data;
  console.log('북리스트 설정됨:', bookList.value.length, '개 항목');
}

getBookList();
</script>
<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>제목</th>
          <th>작가</th>
          <th>출판사</th>
          <th>ISBN</th>
          <th>등록일자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, i) in bookList" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.isbn }}</td>
          <td>{{ book.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  {{  route.fullPath }}
</template>
<style scoped>
table * {
  text-align: center;
}
</style>
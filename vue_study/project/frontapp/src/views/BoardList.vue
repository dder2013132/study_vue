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
        <tr v-for="(board, i) in boardList" :key="board.id" @click="goToDetail(board.id)">
          <td>{{ board.id }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ getDateFormat(board.created_date) }}</td>
          <td>{{ board.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.baseURL="http://localhost:3000/board";
export default{
  data(){
    return{ boardList:[] };
  },
  methods:{
    async getBoardList(){
      this.boardList = await axios.get('http://localhost:3000/board')
      .then(response => this.boardList = response.data)
    },
    goToDetail(id){
      this.$router.push({path:"/boardI", query: {id: id}});
    },
    getDateFormat(dateString){
        if(!dateString){
          return '';
        }
        const date = new Date(dateString);
        if(isNaN(date.getTime())){
          'Error : 유효하지 않은 날짜';
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${day} ${hours}:${minutes}`;
      },
  },
  mounted(){
    this.getBoardList();
  }
}
</script>
<style scoped>
table * {
  text-align: center;
}
</style>

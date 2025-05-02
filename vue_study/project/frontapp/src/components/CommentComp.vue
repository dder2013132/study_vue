<script>
import axios from 'axios';

export default {
  props:[ 'bid' ],
  data() {
    return {
      comments : {}
    };
  },
  methods:{
    getBoardInfo(){
      let comment = axios.get(`http://localhost:3000/comment/${bid}`);
      this.comments = comment.data[0];
    }
  },
  mounted(){

  }
}
</script>
<template>
  <table>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">작성자</th>
        <th scope="col">내용</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(comment, index) in comments" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ comment.writer }}</td>
        <td>{{ comment.content }}</td>
      </tr>
    </tbody>
  </table>
</template>
<style>
  
</style>
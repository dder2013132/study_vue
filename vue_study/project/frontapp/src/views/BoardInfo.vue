<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">번호</th>
            <td scope="col" class="text-center">{{ bookData.id }}</td>
            <th scope="col" class="text-center table-primary">작성일(수정일)</th>
            <td scope="col" class="text-center">
              {{ getDateFormat(bookData.created_date) }}
            </td>
            <td scope="col" class="text-center">
              ({{ getDateFormat(bookData.updated_date) }})
            </td>
            <th scope="col" class="text-center table-primary">이름</th>
            <td scope="col" class="text-center">{{ bookData.writer }}</td>
          </tr>

          <tr>
            <th colspan="2" class="text-center table-primary">제목</th>
            <td colspan="4">{{ bookData.title }}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="200">
              <pre
                style="white-space: pre-wrap;
                  border: none;
                  background-color: white; ">{{ bookData.content }}</pre>
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-center">
              <button @click="updateBoard(bookData.id)"
                class="btn btn-xs btn-info" >
                수정
              </button>
              <button style="margin-left:10px;" @click="returnTo"
                class="btn btn-xs btn-info">
                돌아가기
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 댓글 -->
    <div class="row">
      <CommentComp :bid="bookData.id" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CommentComp from "@/components/CommentComp.vue";
  export default{
    components:{ CommentComp },
    data() {
      return{
        searchNo:"",
        bookData:{},
      };
    },
    methods:{
      async getBoardInfo(){
        let board = await axios.get(`http://localhost:3000/board/${this.searchNo}`)
        this.bookData = board.data[0];
        // .then(response => this.bookData = response.data)
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
      updateBoard(id){
        this.$router.push({path:"/boardF", query: {id: id}});
      },
      returnTo(){
        this.$router.push({path:"/boardL"});
      }
    },
    mounted(){
      this.searchNo = this.$route.query.id;
      this.getBoardInfo();
    }
  }
</script>

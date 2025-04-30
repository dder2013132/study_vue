<template>
  <div class="container">
    <form @submit.prevent>
      <label for="no">No.</label>
      <input v-model="board.id" type="text" id="no" readonly />

      <label for="title">제목</label>
      <input v-model="board.title" type="text" id="title" required />

      <label for="writer">작성자</label>
      <input v-model="board.writer" type="text" id="writer" required />

      <label for="content">내용</label>
      <textarea v-model="board.content" id="content" style="height: 200px"></textarea>

      <label for="regdate">작성일자</label>
      <input :value="formatDate(board.created_date || new Date())" type="text" readonly />

      <div class="btn-group">
        <button type="button" @click="saveBoard()" class="btn">저장</button>
        <button type="button" @click="$router.push(board.isNew ? '/boardL' : `/boardI?id=${board.id}`)" class="btn">돌아가기</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/board";

export default {
  data() {
    return {
      board: { id: "", title: "", writer: "", content: "", isNew: true }
    };
  },
  
  async created() {
    const id = this.$route.query.id;
    
    if (id) {
      // 수정 모드
      try {
        const { data } = await axios.get(`/${id}`);
        this.board = { ...data, isNew: false };
      } catch (e) {
        alert('게시글을 불러오는데 실패했습니다.');
        this.$router.push("/boardL");
      }
    } else {
      // 등록 모드 - 마지막 ID 가져오기
      try {
        const { data } = await axios.get('/');
        const lastId = data.length ? String(Math.max(...data.map(b => Number(b.id))) + 1) : "1";
        this.board = { 
          id: lastId, 
          title: "", 
          writer: "", 
          content: "", 
          created_date: new Date(),
          isNew: true 
        };
      } catch (e) {
        console.error('ID 생성 오류');
      }
    }
  },
  
  methods: {
    formatDate(date) {
      date = new Date(date);
      return date.toLocaleString('ko-KR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit'
      }).replace(/\. /g, '-').replace('.', '');
    },
    
    async saveBoard() {
      if (!this.board.title || !this.board.writer) {
        return alert('제목과 작성자는 필수입니다.');
      }
      
      try {
        const { isNew, ...postData } = this.board;
        
        if (isNew) {
          // 새 글 등록
          const { data } = await axios.get('/');
          const lastId = data.length ? Math.max(...data.map(b => b.id)) + 1 : 1;
          
          await axios.post("/", {
            ...postData,
            id: String(lastId),
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString()
          });
          
          alert('등록 완료!');
        } else {
          // 글 수정
          await axios.put(`/${postData.id}`, {
            ...postData,
            updated_date: new Date().toISOString()
          });
          
          alert('수정 완료!');
        }
        
        this.$emit("saved");
        this.$router.push("/boardL");
      } catch (e) {
        alert(`${this.board.isNew ? '등록' : '수정'} 중 오류가 발생했습니다.`);
      }
    }
  }
};
</script>

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
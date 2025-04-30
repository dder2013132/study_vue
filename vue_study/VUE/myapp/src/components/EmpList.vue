<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/emp";
export default {
  data() {
    return {
      emps : []
    };
  },
  methods:{
    fetchDeptList(){
        axios.get("http://localhost:3000/dept")
            .then(response => this.depts = response.data)
    },
    fetchList(){
      axios.get("")
          .then(response => this.emps = response.data)
    },
    deleteHandler(id){
        if(confirm("삭제하시겠습니까?")){
          axios.delete(`/${id}`)
          .then( () => this.fetchList());
        } else{
          alert("삭제 취소");
        }
      },
      selectHandler(idx){
        this.$emit('select', emps[idx])
      }
  },
  mounted(){
    this.fetchList();
    this.fetchDeptList();

  }
}
</script>
<template>
  <table class="table">
    <thead>
      <tr>
        <th>사번</th>
        <th>이름</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(emp,idx) in emps" :key="emp.id" @select="selectHandler(idx)">
        <td>{{ emp.id }}</td>
        <td>{{ emp.first_name }} {{ emp.last_name }}</td>
        <td>
          <button @click="deleteHandler(emp.id)" class="ml-4 text-red-600">
            삭제
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style>
  
</style>
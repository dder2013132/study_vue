<script>
import axios from "axios";
axios.defaults.baseURL = "/api/emp";
let id = 20;
export default {
  data() {
    return {
      emp: {},
      emps : [],
      depts : []
    };
  },
  watch:{
    selEmp : {
      handler(newEmp){
        if(newEmp){
          this.emp = { ... newEmp };
        }
      }
    }
  },
  methods:{
    fetchDeptList(){
      axios.get("/api/dept")
          .then(response => this.depts = response.data)
    },
    fetchList(){
      axios.get("")
          .then(response => this.emps = response.data)
    },
    empUpdate(){
      if(this.emp.id) {
        axios.put(`/${this.emp.id}`,this.emp)
          .then( () => this.$emit("saved"))
      } else{
        this.emp.id = ++id;
        axios.post("",this.emp)
        .then( () => this.$emit("saved"))
      }
    },
    reset(){
      this.emp = {}
    }
  },
  mounted(){
    this.fetchList();
    this.fetchDeptList();
  }
}
</script>
<template>
  <div class="col">
      <div>
    <h3>{{ emp ? "직원 수정" : "직원 등록" }}</h3>
    사번 : <input v-model="emp.id" class="form-control" />
    <div>
      <label>fname</label>
      <input v-model="emp.first_name" class="form-control" />
    </div>
    <div>
      <label>lname</label>
      <input v-model="emp.last_name" class="form-control" />
    </div>
    <div>
      <label>jobId</label>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          v-model="emp.job_id"
          value="it"
        /><label class="form-check-label">IT</label>
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          v-model="emp.job_id"
          value="sales"
        /><label class="form-check-label">SALES</label>
      </div>
    </div>
    <div>
      <label>부서</label>
      <select v-model="emp.department_id" class="form-select">
        <option v-for="dept in depts" :value="dept.dno">
          {{ dept.dname }}
        </option>
      </select>
    </div>
    <div>
      <label>급여</label>
      <input class="form-control" v-model="emp.salary" />
    </div>
    <div>
      <label>이메일</label>
      <input class="form-control" v-model="emp.email" />
    </div>
    <button @click="empUpdate()" class="btn btn-success mt-2">수정</button>
    <button @click="reset()" class="btn btn-warning mt-2">초기화</button>
  </div>
  </div>
</template>
<style>
  
</style>
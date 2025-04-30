<script>
import EmpList from '@/components/EmpList.vue'
import EmpForm from '@/components/EmpForm.vue'
export default {
  components : { "EmpList" : EmpList, 
                 "EmpForm" : EmpForm},
  props : { selEmp : Object},
  data() {
    return {
      selectedEmp : {first_name : 'test'},
      emp : {},
      depts : []
    };
  },
  methods:{
    selectHandler(emp){
      this.selectedEmp = emp;
    },
    savedHandler() {
      this.$refs.listRef.fetchList();
    }
  },
  mounted(){
  }
}
</script>
<template>
<div class="row">
  <div class="col"><emp-list @select="selectHandler" ref="listRef"/></div>
  <div class="col"><emp-form :selEmp="selectedEmp" @saved="savedHandler"/></div>
</div>
</template>
<style>
  
</style>
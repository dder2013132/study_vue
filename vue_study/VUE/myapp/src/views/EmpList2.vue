<script>
export default {
  data() {
    return {
        emps : []
    };
  },
  mounted(){
  axios.get("/empdata.json")
  .then(res=>this.emps=res.data);
}
}
</script>
<template>
  <table>
    <tr>
      <td></td>
    </tr>
  </table>
</template>
<style>
  
</style>
<script>
export default {
  data() {
    return {
      msg:''
    };
  },
  methods: {
    childFunc(){
      console.log('부모에서 직접 발생시킨 이벤트')
    },
  },
}
</script>
<template>
  {{msg}}<br>
  <button type="button" @click="childFunc" ref="btn" class="btn btn-success">click</button>
</template>
<style>
  
</style>
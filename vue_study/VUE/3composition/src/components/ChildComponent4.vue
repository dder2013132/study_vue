<script>
export default {
  emits : ['send-message'],
  data() {
    return {
      msg: '자식 컴포넌트로 부터 보내는 메시지'
    }
  },
  methods: {
    childFunc(){
      this.$emit("send-message",this.msg)
    }
  },
}
</script>
<template>
  {{ msg }}
  <button type="button" @click="childFunc" ref="btn" class="btn btn-success">click</button>
</template>
<style>
  
</style>
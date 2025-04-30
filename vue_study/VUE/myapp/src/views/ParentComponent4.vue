<script>
import ChildComponent4 from "@/components/ChildComponent4.vue"
export default {
  components : { "ChildComponent4" : ChildComponent4},
  data() {
    return {
      
    };
  },
  methods: {
    sendMessage(msg){
      console.log(msg)
    }
  },
  mounted() {
    
  }
}
</script>
<template>
  <h3>부모컴포넌트</h3>
  <child-component4 @send-message="sendMessage"></child-component4>
</template>
<style>
  
</style>
<script>
import FancyButton from '@/components/FancyButton.vue';
import SlotModalLayout from '@/components/SlotModalLayout.vue';
import ProjectInject from './ProjectInject.vue';
export default {
  components: {FancyButton, SlotModalLayout,ProjectInject},
  data() {
    return {
      
    };
  },
  methods:{
    opening(){
      if(confirm("여시겠습니까?")){
        alert("열기")
      } else{
        alert("취소")
      }
    }
  }
}
</script>
<template>
  <!-- <fancy-button style="margin-bottom : 10px"></fancy-button><br>
  <fancy-button>팬시버튼</fancy-button><br>
  <fancy-button>저장하기</fancy-button><br> -->
  <slot-modal-layout>
    <template #header>
      <h1>다음은 페이지 제목일 수 있습니다.</h1>
    </template>
    <template #default>
      <p>주요 내용에 대한 단락입니다.</p>
      <p>그리고 또 하나</p>
    </template>
    <template #footer>
      <p>다음은 연락처 정보입니다.</p>
      <button type="button" @click="opening()">열기</button>
    </template> 
  </slot-modal-layout>
  <div><h1><ProjectInject/></h1></div>
</template>
<style>
  
</style>
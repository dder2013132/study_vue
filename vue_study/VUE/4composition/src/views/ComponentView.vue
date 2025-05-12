<template>
  <div>
    useComponentrefs이용
    <input ref="my-input" value="hello"/>
    현재페이지는 {{ $route.fullPath }} <br>
    <a href="#" @click="router.push('/')">home</a>
    <a href="#" @click="goPage">about</a>
  </div>

  <hr/>
  count = {{ count.value }} <br>
  <button @click="clickHandler">클릭</button>
  <ButtonCounter :counter="count.value" @incrementevent="clickHandler">자식 컴포넌트</ButtonCounter>
</template>

<script setup>
import ButtonCounter from "@/components/ButtonCounter.vue"
import { useRoute, useRouter } from "vue-router"
import { onMounted, reactive, useTemplateRef } from "vue"

const route = useRoute()
const router = useRouter()

const goPage = ()=>{
  router.push("/about");
  router.push({name:"about"});
}

// count 반응형 변수 선언
const count = reactive({value:0})

// count 증가
const clickHandler = (initValue)=>{
  // number 0 ==> false
  if(initValue > 0){
    count.value = initValue;
  }else{
    count.value++;
  }
}

onMounted(()=>{
  console.log('count=', count.value)
  console.log('input=', input.value.value)
  input.value.focus()
});

const input = useTemplateRef('my-input')

</script>

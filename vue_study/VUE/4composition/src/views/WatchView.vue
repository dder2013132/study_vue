<script setup>
import { ref,watch,computed,reactive } from 'vue'

const books = reactive([ 'Vue 2 - Advanced Guide',
                    'Vue 3 - Basic Guide',
                    'Vue 4 - T'])
const question = ref('');
const answer = ref('질문에는 일반적으로 물음표가 포함됩니다.');
const src = ref('')

const publishedBooksMessage = computed( () => {
  return books.length > 0 ? 'yes' : 'no'
})

  watch(question, async(newQuestion, oldQuestion)=>{
  if (newQuestion.includes('?')){
      answer.value = ('생각중')
  try {
  const res = await fetch ('https://yesno.wtf/api')
  answer.value = (await res.json()).answer === 'yes' ? '네' : '아니오'
  src.value = data.image;
  } catch (error) {
  answer.value = '에러! API에 연결할 수 없습니다.' + error
  }
}
});

</script>
<template>
  <input v-model="question" @input="">
  <div>{{ answer }}</div>
  <img :src="src"/>
  <hr>
  books : {{ books.length > 0 ? 'yes' : 'no' }}
  books : {{ publishedBooksMessage }}
</template>
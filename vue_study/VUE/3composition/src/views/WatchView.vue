<script setup>
import { ref, watch, computed } from 'vue'

const books = ref(['Vue 2 - Advanced Guide',
  'Vue 3 - Basic Guide',
  'Vue 4 - The Mystery']
)

const question = ref('')
const answer = ref('질문에는 일반적으로 물음표가 포함됩니다.')
const src = ref('')

watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    answer.value = '생각 중...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      const data = await res.json()
      answer.value = data.answer === 'yes' ? '네' : '아니오'
      src.value = data.image
    } catch (error) {
      answer.value = '에러! API에 연결할 수 없습니다.' + error
    }
  }
});

// 계산된 ref
const publishedBooksMessage = computed(() => {
  return books.length > 0 ? 'Yes' : 'No'
});
</script>
<template>
  <input v-model="question">
  <div>{{ answer }}</div>
  <img :src="src" />
  <br>
  <hr>books: {{ books.length > 0 ? 'yes' : 'no' }}<br>
  books : {{ publishedBooksMessage }}
</template>
<style></style>
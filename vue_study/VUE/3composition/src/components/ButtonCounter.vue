<template>
  <div>
    <button @click="incrementChild">
      <slot></slot>
    </button> <br>
    <button @click="incrementChild">증가 {{ count }}</button> <br>
    <button @click="$emit('incrementevent', 0)">증가 {{ count }}</button> <br>
    <button @click="$emit('incrementevent')">증가 {{ count }}</button> <br>
    <button @click="count++">증가 {{ count }}</button> 직접변경안됨 <br>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps(['count']);
const emit = defineEmits(['incrementevent']);
const incrementChild = () => {
  emit('incrementevent')
}
</script>

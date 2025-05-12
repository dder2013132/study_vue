<template>
  <div>
    <button @click="incrementChild">
      <slot></slot>
    </button> 
   <button @click="incrementChild"> handler 통해서 호출 {{count}}</button> 
   <button @click="$emit('incrementevent', 1)"> emit 직접변경 {{count}}</button> 
   <button @click="$emit('incrementevent')"> emit인수 {{count}}</button> 
   <button @click="this.count++"> 직접변경 안됨 {{count}}</button>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
  const props = defineProps ([ 'count' ])
  const emit = defineEmits (["incrementChild"])

function incrementChild() {
  emit("incrementevent", props.count + 1);
}

</script>



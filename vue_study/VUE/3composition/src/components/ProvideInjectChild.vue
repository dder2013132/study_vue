<script setup>
import { inject,onMounted } from "vue";

const itemLength = inject("itemLength");

onMounted(()=>{
  console.log(itemLength);
})
</script>
<template>
  <div>{{itemLength }}</div>
</template>
<style>
  
</style>
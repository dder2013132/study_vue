<template>
<div></div>
</template>
<script setup>
import { inject } from 'vue';

const itemLength = inject("itemLength");

function onMounted(){
    console.log(itemLength);
  }
</script>
<template>
  <div>
    <ProvideInjectChild />
  </div>
</template>
<script setup>
import ProvideInjectChild from '@/components/ProvideInjectChild.vue';
import { provide, ref } from 'vue';

const items = ref(["A","B","C","DEF","G"]);

provide("itemLength",items.value.length);
</script>
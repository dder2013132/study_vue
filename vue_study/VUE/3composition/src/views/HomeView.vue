<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    count : {{ $store.state.count }}
    login : {{ $store.state.loginYn }}
    email : {{ $store.state.email }}
    pw : {{ $store.state.pw }}
    <TheWelcome />
  </main>
</template>

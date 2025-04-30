<script>
export default {
  data() {
    return {
      
    };
  }
}
</script>
<template>
  <div class="modal-container">
    <header><slot name="header"></slot></header>
    <main><slot></slot></main>
    <footer style="color:red;"><slot name="footer"></slot></footer>
  </div>
</template>
<style>
  .modal-container{
    border:1px solid #ddd;
  }
</style>
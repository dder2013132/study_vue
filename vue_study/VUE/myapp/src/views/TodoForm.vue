<script>
export default {
  data: function () {
        return {
          todos: []
        }
      },
      methods: {},
      mounted() {
        fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then(response => this.todos = response.filter( t => t.id<=17))
      }
}
</script>
<template>
  <div id="myDIV" class="header">
      <h2 style="margin:5px">My To Do List</h2>
      <input type="text" id="myInput" placeholder="Title...">
      <span onclick="newElement()" class="addBtn">Add</span>
    </div>

    <ul id="myUL">
      <li v-for="(user) in todos" :class="{checked:user.completed}">{{user.id}}</li>
    </ul>
</template>
<style>
  
</style>
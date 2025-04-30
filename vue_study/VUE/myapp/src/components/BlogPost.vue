<script>
export default {
  //props: ["title", "contents", "likes", "isPublished", "posts", "commentIds"],
  props : {
    title : {type : String, default: "기본 타이틀"},
    likes : {type : Number, validator:function(value){
      return value>0
    } },
    isPublished : {type : Boolean, required:true},
    commentIds : Array
  },
  data() {
    return {
      
    };
  }
}
</script>
<template>
  <div class="container">

    <div class="card">
      <div class="card-header">{{ title }}</div>
      <div class="card-body">
        <p>{{ contents }}</p>
        <p>좋아요: {{ likes }}</p>
        <p v-if="isPublished">출판됨</p>
        <p v-else>편집중</p>
        <hr>
        <div v-for="id in commentIds">{{ id }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="post in posts">
        <div class="card" style="margin-top: 10px;">
          <div class="card-header">{{ post.title }}</div>
          <div class="card-body">
            <p>{{ post.contents }}</p>
            <p>좋아요: {{ post.likes }}</p>
            <p v-if="post.isPublished">출판됨</p>
            <p v-else>편집중</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  
</style>
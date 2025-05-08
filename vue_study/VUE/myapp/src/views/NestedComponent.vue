<template>
  <div>
  <!-- <page-title  title="마이페이지" subtitle="주문내역"/> -->
  <page-title :title="title" subtitle="서브타이틀"/>
  <blog-post :likes="50"
             :is-published="true"
             :comment-ids="[100,103,200]"/>
  <blog-post v-bind="post"/> <!--3번 태그부르기-->
  <!-- <blog-post :title="post.likes"/> -->
   <hr>
   <blog-post v-bind="post"/>
   <blog-post v-for="post in posts"/>
   </div>
</template>
<script setup>
import PageTitle from "@/components/PageTitle.vue"
import BlogPost from "@/components/BlogPost.vue"
import { ref } from "vue";

const posts = ref([])

const post = ref({ })
</script>
<template>
  <!-- <page-title  title="마이페이지" subtitle="주문내역"/> -->
  <page-title :title="title" subtitle="서브타이틀"/>
  <blog-post :likes="50"
             :is-published="true"
             :comment-ids="[100,103,200]"/>
  <blog-post v-bind="post"/> <!--3번 태그부르기-->
  <!-- <blog-post :title="post.likes"/> -->
   <hr>
   <blog-post v-for="post in posts" v-bind="post"/>
</template>
<script>
import PageTitle from "@/components/PageTitle.vue"
import BlogPost from "@/components/BlogPost.vue"
//1. 임포트
export default {
  components : {PageTitle, BlogPost}, // 2. 컴포넌트를 사용하기위한 등록
  data(){
    return { title : '동적페이지이름' ,
             posts : [ { isPublished : false, title:"블로그1"},
                       { isPublished : true, title:"블로그2"},
                       { isPublished : true, title:"블로그3"},
                       { isPublished : false, title:"블로그4"},

             ],
             post :{
             isShow : true,
             likes : 100,
             title: "vue 블로그",
             commentIds : [10,11,12]}}
  }
}
</script>
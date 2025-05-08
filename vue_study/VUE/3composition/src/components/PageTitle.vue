<script>
export default{
  props: ["title", "contents", "likes", "isPublished", "posts", "commentIds","subtitle"],
  data(){
    return{}
  },
  methods:{},
  mounted(){},
  watch:{}
}
</script>
<template>
  <div class="alert alert-warning">
    <h2>{{ title }} {{ subtitle }}</h2>
  </div>
</template>
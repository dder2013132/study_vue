<template>
  <div class="container mt-4">
    <div class="card h-100 shadow-sm">
      <div class="card-header">
        <h5 class="card-title">{{ title }} ( {{ author }} )</h5>
      </div>
      <div class="card-body">
        좋아요 {{ likes }}
        <div v-if="props.isPublished">출판됨</div>
        <div v-else>작성중</div>
        <div class="mt-3">
          <h5>댓글리스트</h5>
          <div v-for="comment in props.commentIds">{{ comment }}</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref, defineProps} from "vue";
  //props: ["title", "author", "likes", "isPublished", "commentIds"],
  const props = defineProps (
  {
    title: { type: String, required: true },
    author: String,
    likes: {
      type: Number,
      validator: function (value) {
        return value > 0;
      },
    },
    isPublished: Boolean,
    commentIds: Array,
  },
  )
</script>

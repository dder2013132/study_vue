<template>
  email <input v-model="email">
  pw <input v-model="pw">
  <button @click.prevent="loginHandler">로그인</button>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: "",
      pw: "",
    };
  },
  methods: {
    async loginHandler() {
      const url = "/api/users/login";
      const data = { email:this.email, pw:this.pw };
      const result = await axios.post(url,data)
      // axios({url:'',method:'',data:{}}) ->위와 같은 의미
      alert(result.data.code)
      this.$store.commit('increment');
      // this.$store.commit('changeEmail',{email:this.email});
      // this.$store.commit('changePw',{pw:this.pw});
      // this.$store.commit('changeLoginyn',true);
      this.$store.dispatch('login',{email:this.email,pw:this.pw});
      this.$router.push({path: "/"});
    }
  }
}

</script>
<style></style>
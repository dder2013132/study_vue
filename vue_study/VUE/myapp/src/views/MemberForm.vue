<script>
export default {
  data() {
    return {
          options : [ {text:"가",value:'A'},
          {text:"나",value:'B'},
          {text:"다",value:'C'},
          {text:"라",value:'D'}
          ],
          message : "  ",
          checked : false,
          checkedNames : ["젝","존","마이크"],
          picked : "하나",
          selected : '나',
          selected2 : ["나","다"],
        }
      },
      methods: { 
        memberInsert(){
          alert("회원가입완료");
          this.$router.push("/");
        }
       }
    }
</script>
<template>
  <p>메세지: {{ message }}</p>
    <input v-model="message" placeholder="메세지 입력하기" />

    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>

    <div>체크된 이름: {{ checkedNames }}</div>

    <input type="checkbox" id="jack" value="젝" v-model="checkedNames">
    <label for="jack">젝</label>

    <input type="checkbox" id="john" value="존" v-model="checkedNames">
    <label for="john">존</label>

    <input type="checkbox" id="mike" value="마이크" v-model="checkedNames">
    <label for="mike">마이크</label>

    <div>선택한 것: {{ picked }}</div>

    <input type="radio" id="one" value="하나" v-model="picked" />
    <label for="one">하나</label>

    <input type="radio" id="two" value="둘" v-model="picked" />
    <label for="two">둘</label>

    <div>선택됨: {{ selected }}</div>

    <select v-model="selected">
      <option disabled value="">다음 중 하나를 선택하세요</option>
      <option>가</option>
      <option>나</option>
      <option>다</option>
    </select>

    <div>선택됨: {{ selected2 }}</div>

    <select v-model="selected2" multiple>
      <option>가</option>
      <option>나</option>
      <option>다</option>
    </select>

    <select v-model="selected2" multiple>
      <option disabled value="">다음 중 하나를 선택하세요</option>
      <option v-for="opt in options" :value="opt.value">{{opt.text}}</option>
    </select>
  <button @click="memberInsert()">회원가입</button>
</template>
<style scoped>
  
</style>
<!-- <script>
import GoodsView from './components/goods.vue';
import MemberForm from './views/MemberForm.vue';
import MovieForm from './views/MovieForm.vue';
import TodoForm from './views/TodoForm.vue';
import EmpForm from './views/EmpForm.vue';
import { RouterLink, RouterView} from 'vue-router'

export default{
    components:{GoodsView, MemberForm, MovieForm,TodoForm,EmpForm},
    data(){
      return{
        fruits:["사과","바나나","오렌지"],
        message:"greeting"
      }
    },
    method:{}
  }
</script>

<template>
  <div class="container">
    <h1>Hello App!</h1>
    <p>
      <strong>Current route path:</strong> {{ $route.fullPath }}
    </p>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link active" aria-current="page">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/memberForm" class="nav-link active" aria-current="page">회원가입</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/movieForm" class="nav-link active" aria-current="page">영화검색</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/todoForm" class="nav-link active" aria-current="page">Todo</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/paramView/kim" class="nav-link active" aria-current="page">파라미터</RouterLink>
        </li>
        <li>
          <RouterLink to="/paramView/park" class="nav-link active" aria-current="page">파라미터</RouterLink>
        </li>
      </ul>
    </div>
  </div>
  </nav>  
    <main>
      <RouterView />
    </main>
  </div>
</template> -->

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/nested">컴포넌트 안에 다른 컴포넌트사용</RouterLink>
        <RouterLink to="/parent">parent child</RouterLink>
        <RouterLink to="/parent4">parent child4</RouterLink>
        <RouterLink to="/emp">emp</RouterLink>
        <RouterLink to="/empview">empview</RouterLink>
        <RouterLink to="/slot">slot</RouterLink>
        <RouterLink to="/provide">provide</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

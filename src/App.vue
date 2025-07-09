<script setup>
import RegisterForm from './components/users/RegisterForm.vue';
import LoginForm from './components/users/LoginForm.vue';
import Todo from "./components/ui/Todo.vue"
// import { STORAGE_KEY } from "./constant"
import { getToken } from "./components/utils/token"


import {ref, onMounted} from "vue"
const show = ref("login")

onMounted(()=>{
    // const token = localStorage.getItem(STORAGE_KEY)
    const token = getToken()

    if (token) {
    show.value = "todo"
    }
})

</script>

<template>
  <!-- <LoginForm @goRegister="showLogin = false" v-if="showLogin" />
  <RegisterForm @goLogin="showLogin = true" v-else /> -->
  <Todo v-if="show == 'todo'" />
  <LoginForm v-if="show == 'login'" @goRegister="show = 'register'" @login_success="show = 'todo'"/>
  <RegisterForm v-if="show == 'register'" @goLogin="show = 'login'" />
</template>

<style scoped>
</style>

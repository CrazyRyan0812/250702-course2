<script setup>
import { ref, computed } from "vue"
import axios from "axios"
// import { STORAGE_KEY } from "../../constant"
import { setToken } from "../utils/token"
const emits = defineEmits(["goRegister", "login_success"])

// const STORAGE_KEY = "demo-todo"

const email = ref("")
const password = ref("")
const canLogin = computed(() => {
  return email.value != "" && password.value != ""
})

const login = async () => {
  const formData = {
    user: {
      email: email.value,
      password: password.value,
    },
  }

  try {
    const resp = await axios.post(
      "https://todoo.5xcamp.us/users/sign_in",
      formData
    )
    console.log(resp.headers.authorization)
    const token = resp.headers.authorization
    // localStorage.setItem(STORAGE_KEY, token)
    setToken(token)
    clearAll()
    emits("login_success")
  } catch (err) {
    const message = err.response.data.message
    alert(message)
  }
}
const clearAll = () => {
  email.value = ""
  password.value = ""
}
</script>
<template>
    <section class="container mx-auto">
        <form class="flex flex-col gap-4">
            <div class="flex flex-col">
            <label class="label">Email</label>
            <input v-model.trim="email" type="email" class="input" />
            </div>
            <div class="flex flex-col">
            <label class="label">密碼</label>
            <input v-model.trim="password" type="password" class="input" />
            </div>
            <div>
            <button @click.prevent="login" :disabled="!canLogin" class="btn">登入</button>
            </div>
        <span>還沒有帳號嗎？ <a @click.prevent="$emit('goRegister')" href="#">註冊</a>一個吧</span>
        </form>
    </section>
    <!-- <div class = "bg-green-500 px-2 py-1 rounded hover:bg-red-400">TODOO</div> -->
</template>
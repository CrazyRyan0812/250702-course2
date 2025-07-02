<script setup>
import { ref } from "vue"
import axios from "axios"
const emits = defineEmits(["goLogin"])

const goLogin = () => {
  emits("goLogin")
}

const email = ref("")
const nickname = ref("")
const password = ref("")

const register = async () => {
  if (email.value != "" && nickname.value != "" && password.value != "") {
    // 打 API

    const formData = {
      user: {
        email: email.value,
        nickname: nickname.value,
        password: password.value,
      },
    }

    try {
      const resp = await axios.post("https://todoo.5xcamp.us/users", formData)
      console.log(resp.data)
      alert("註冊成功")
      goLogin()
    } catch (err) {
      const message = err.response.data.error
      alert(message)
    }
  }
}

</script>

<template>
    <section class="container mx-auto">
        <form class="flex flex-col gap-4">
            <div class="flex flex-col">
            <label class="label">Email</label>
            <input v-model="email" type="email" class="input"/>
            </div>
            <div class="flex flex-col">
            <label class="label">暱稱</label>
            <input v-model="nickname" type="text" class="input"/>
            </div>
            <div class="flex flex-col">
            <label class="label">密碼</label>
            <input v-model="password" type="password" class="input"/>
            </div>
            <div>
            <button @click.prevent="register" class="btn">註冊</button>
            </div>
        <span>已經有帳號？ <a @click.prevent="goLogin" href="#">登入</a></span>
        </form>
    </section>
    <!-- <div class = "bg-green-500 px-2 py-1 rounded hover:bg-red-400">TODOO</div> -->
</template>
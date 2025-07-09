<script setup>
import {ref, onMounted} from "vue"
import axios from "axios"
import { getToken } from "../utils/token"
import TodoItem from "./TodoItem.vue"
import { useTodoStore } from "../../stores/TodoStore"

axios.defaults.headers.common["Authorization"] = getToken()

const store = useTodoStore()

const todoInput = ref("")
// const todos = ref([])

const onAddTodo = () => {
  const content = todoInput.value

  if (content != "") {
    store.addTodo(content)
    todoInput.value = ""
  }
}

onMounted(() => {
  store.getTodos()
})

// const addTodo = async () => {
//   const content = todoInput.value

//   if (content != "") {
//     const formData = {
//       todo: {
//         content: content,
//       },
//     }
//     try {
//       const uuid = crypto.randomUUID()
//       store.todos.value.unshift({
//         id: uuid,
//         content: content,
//         completed_at: null,
//       })
//       // todos.value.unshift({
//       //   id: uuid,
//       //   content: content,
//       // })

//       todoInput.value = ""

//       const { data } = await axios.post(
//         "https://todoo.5xcamp.us/todos",
//         formData
//       )
//       // const todo = todos.value.find((t) => t.id == uuid)
//       const todo = store.todos.value.find((t) => t.id == uuid)
//       todo.id = data.id
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

// onMounted(async () => {
//   const { data } = await axios.get("https://todoo.5xcamp.us/todos")
//   // todos.value = data.todos
//   store.todos = data.todos  
// })

// const onDeleteTodo = (id) => {
//   const idx = todos.value.findIndex((t) => t.id == id)
//   // todos.value.splice(idx, 1)
//   store.todos.value.splice(idx, 1)
//   axios.delete(`https://todoo.5xcamp.us/todos/${id}`)
// }

// const onToggleTodo = (id) => {
//   const todo = store.todos.value.find((t) => t.id == id)
//   // const todo = todos.value.find((t) => t.id == id)

//   if (todo.completed_at) {
//     todo.completed_at = null
//   } else {
//     todo.completed_at = new Date().toLocaleString()
//   }

//   axios.patch(`https://todoo.5xcamp.us/todos/${id}/toggle`)
// }
</script>

<template>
  <section class="container mx-auto">
    <h1 class="text-2xl">Insert TODO</h1>
    <div class="my-2">
      <input @keyup.enter="onAddTodo"  type="text" v-model.trim="todoInput" class="input" />
      <button @click="onAddTodo" class="btn">新增</button>
    </div>
    <div class="divider"></div>
    <!-- <ul>
      <li v-for="todo in todos">{{ todo.content }}</li>
    </ul> -->
    <section>
      <!-- <TodoItem @delete-todo="onDeleteTodo" @toggle-todo="onToggleTodo" :key="todo.id" :todo="todo" v-for="todo in todos" /> -->
      <!-- <TodoItem @delete-todo="onDeleteTodo" @toggle-todo="onToggleTodo" :key="todo.id" :todo="todo" v-for="todo in store.todos" /> -->
      <TodoItem :key="todo.id" :todo="todo" v-for="todo in store.todos" />
    </section>
  </section>
</template>

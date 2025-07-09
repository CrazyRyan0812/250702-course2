<script setup>
import { useTemplateRef, ref } from "vue"
import { useTodoStore } from "../../stores/TodoStore"

const store = useTodoStore()
const editModal = useTemplateRef("edit-modal")
const content = ref("")

const props = defineProps({
  todo: Object,
})

const onEditTodo = () => {
  content.value = props.todo.content
  editModal.value.showModal()
}

const close = () => {
  editModal.value.close()
}

const onUpdateTodo = () => {
  if (content.value != "") {
    const todo = store.todos.find((t) => t.id == props.todo.id)
    todo.content = content.value
    editModal.value.close()

    store.updateTodo(todo.id, content.value)
  }
}

// const emits = defineEmits(["delete-todo", "toggle-todo"])

// const deleteTodo = (todoId) => {
//   emits("delete-todo", todoId)
// }

// const toggleTodo = (id) => {
//     const todo = store.todos.find((t) => t.id == id)

//     if (todo.completed_at) {
//     todo.completed_at = null
//     } else {
//     todo.completed_at = new Date().toLocaleString()
//     }

//     //   emits("toggle-todo", todoId)
// }
</script>

<template>
  <!-- <li>{{ todo.content }}</li> -->
  <div class="select-none card bg-base-100 card-md shadow-sm">
    <div class="card-body">
      <h2 class="card-title">{{ todo.content }}</h2>
      <div class="justify-end card-actions">
        <button @click="onEditTodo(todo.id)" class="btn btn-sm btn-info">
          編輯
        </button>
        <!-- <button @click="toggleTodo(todo.id)" class="btn btn-sm btn-warning"> -->
        <button @click="store.toggleTodo(todo.id)" class="btn btn-sm btn-warning">
          {{ todo.completed_at ? "取消完成" : "完成" }}
        </button>
        <!-- <button @click="deleteTodo(todo.id)" class="btn btn-sm btn-error"> -->
        <button @click="store.deleteTodo(todo.id)" class="btn btn-sm btn-error">
          刪除
        </button>
      </div>
      <span v-if="todo.completed_at">完成日期：{{ todo.completed_at }}</span>
    </div>
  </div>

  <dialog ref="edit-modal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">編輯待辦事項</h3>
      <p class="py-4">
        <input
          @keyup.enter="onUpdateTodo"
          v-model="content"
          type="text"
          class="input"
        />
      </p>
      <div>
        <button @click="close" class="btn">取消</button>
        <button @click="onUpdateTodo" class="btn btn-warning">存檔</button>
      </div>
    </div>
  </dialog>
</template>

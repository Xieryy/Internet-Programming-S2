<template>
    <li class="list pending">
      <input
        type="checkbox"
        :checked="todo.completedAt != null"
        @change="onChange($event, todo.id)"
      />
      <span class="task">{{ todo.name }}</span>
      <i class="uil uil-trash" @click.stop="remove(todo.id)" title="Remove"></i>
    </li>
</template>
<script>
import { useTodoStore } from "../stores/todo";
export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  props: ["todo", "icon"],
  methods: {
    toggleStatus(todoId) {
      this.todoStore.toggleStatus(todoId);
    },
    onChange(e, todoId) {
      const checked = e.target.checked;
      this.todoStore.setStatus(todoId, checked);
    },
    remove(todoId) {
      this.todoStore.deleteTodo(todoId);
    },
  },
};
</script>

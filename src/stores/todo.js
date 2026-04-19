import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = import.meta?.env?.VITE_API_URL ?? 'http://localhost:3000';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.filter((t) => !t.completedAt).length,
  },
  actions: {
    async fetchTodos() {
      try {
        const res = await axios.get(`${BASE_URL}/tasks`);
        this.todos = res.data || [];
        return this.todos;
      } catch (err) {
        console.error('Failed to fetch todos:', err);
        this.todos = [];
        return [];
      }
    },
    async addTodo(payload) {
      try {
        const res = await axios.post(`${BASE_URL}/tasks`, { name: payload });
        this.todos.push(res.data);
        return res.data;
      } catch (err) {
        console.error('Failed to add todo:', err);
        throw err;
      }
    },
    async toggleStatus(id) {
      const todo = this.todos.find((t) => String(t.id) === String(id));
      if (!todo) return null;
      // delegate to setStatus using inverse
      const completed = !todo.completedAt;
      return this.setStatus(id, completed);
    },
    async setStatus(id, completed) {
      const todo = this.todos.find((t) => String(t.id) === String(id));
      if (!todo) return null;
      try {
        if (completed) {
          const res = await axios.patch(`${BASE_URL}/tasks/${id}/done`, {});
          todo.completedAt = res.data?.completedAt ?? new Date().toISOString();
        } else {
          const res = await axios.patch(`${BASE_URL}/tasks/${id}/pending`, {});
          todo.completedAt = res.data?.completedAt ?? null;
        }
        return todo;
      } catch (err) {
        console.error('Failed to set status:', err);
        throw err;
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`${BASE_URL}/tasks/${id}`);
        this.todos = this.todos.filter((t) => String(t.id) !== String(id));
      } catch (err) {
        console.error('Failed to delete todo:', err);
        throw err;
      }
    },
    clearAll() {
      return Promise.all(
        this.todos.map((t) => axios.delete(`${BASE_URL}/tasks/${t.id}`))
      )
        .catch((err) => {
          console.error('Failed to clear some tasks:', err);
        })
        .finally(() => {
          this.todos = [];
        });
    },
  },
});


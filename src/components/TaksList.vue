<template>
  <div class="container bg-light pt-3 p-3 mb-2 text-dark border border-secondary rounded w-50">
    <div class="container mt-5">
      <h1 class="text-center mb-4">Lista de Tarefas</h1>
      <div class="input-group mb-3">
        <input v-model="newTask" type="text" class="form-control me-2" placeholder="Adicionar nova tarefa" />
        <button @click="addTask" class="btn btn-primary">Adicionar</button>
      </div>
      <TaskApi @add-task="addTaskFromApi" />
      <ul class="list-group mt-3">
        <li v-for="(task, index) in tasks" :key="index" :class="['list-group-item', task.completed ? 'list-group-item-success' : '', 'task-item']">
          <div class="d-flex justify-content-between align-items-center">
            <span>{{ task.text }}</span>
            <div>
              <button @click="toggleTaskCompletion(task)" class="btn btn-success btn-sm me-2">Concluir</button>
              <button @click="removeTask(index)" class="btn btn-danger btn-sm">Remover</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import TaskApi from './TaskApi.vue';

export default {
  components: {
    TaskApi
  },
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, completed: false });
        this.newTask = '';
        this.saveTasks();
      }
    },
    addTaskFromApi(task) {
      this.tasks.push(task);
      this.saveTasks();
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
      this.saveTasks();
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasks() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        this.tasks = JSON.parse(tasks);
      }
    }
  },
  mounted() {
    this.loadTasks();
  }
};
</script>
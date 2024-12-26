<template>
  <div class="container-fluid d-flex justify-content-center align-items-center mt-3">
    <div class="container bg-light pt-3 p-3 mb-2 text-dark border border-secondary rounded w-100 w-md-50">
      <div class="container mt-5">
        <h1 class="text-center mb-4">Lista de Tarefas</h1>
        <div class="input-group mb-3">
          <input v-model="newTask" type="text" class="form-control" placeholder="Adicionar nova tarefa" />
          <button @click="addTask" class="btn btn-primary">Adicionar</button>
        </div>
        <div class="input-group mb-3">
          <select v-model="selectedTask" class="form-select">
            <option v-for="task in taskSuggestions" :key="task.id" :value="task">{{ task.title }}</option>
          </select>
          <button @click="addSelectedTask" class="btn btn-secondary ms-2">Sugestão de Tarefas</button>
        </div>
        <ul class="list-group">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      tasks: [],
      taskSuggestions: [],
      selectedTask: null
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, completed: false });
        this.newTask = '';
      }
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    async fetchTaskSuggestion() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        this.taskSuggestions = data.filter(task => !task.completed);
      } catch (error) {
        console.error('Erro ao buscar sugestões de tarefas:', error);
      }
    },
    addSelectedTask() {
      if (this.selectedTask) {
        this.tasks.push({ text: this.selectedTask.title, completed: false });
        this.selectedTask = null;
      }
    }
  },
  mounted() {
    this.fetchTaskSuggestion();
  }
};
</script>
<template>
  <div class="container bg-light pt-3 p-3 mb-2 text-dark border border-secondary rounded w-25">
    <div class="container mt-5">
      <h1 class="text-center mb-4">Lista de Tarefas</h1>
      <div class="input-group mb-3">
        <input v-model="newTask" type="text" class="form-control" placeholder="Adicionar nova tarefa" />
        <button @click="addTask" class="btn btn-primary">Adicionar</button>
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
</template>

<script>
export default {
  name: 'TaksList',
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
      }
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style>

</style>
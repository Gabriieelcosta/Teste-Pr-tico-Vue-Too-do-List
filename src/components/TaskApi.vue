<template>
  <div class="input-group mb-3">
    <select v-model="selectedTask" class="form-select mt-2 me-2">
      <option v-for="task in taskSuggestions" :key="task.id" :value="task">{{ task.title }}</option>
    </select>
    <button id="btn-two" @click="addSelectedTask" class="btn mt-2">Sugestões de Tarefas</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskSuggestions: [],
      selectedTask: null
    };
  },
  methods: {
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
        this.$emit('add-task', { text: this.selectedTask.title, completed: false });
        this.selectedTask = null;
      }
    }
  },
  mounted() {
    this.fetchTaskSuggestion();
  }
};
</script>

<style>
#btn-two {
  background-color: #607D8B;
  color: white;
}
</style>
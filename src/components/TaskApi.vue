<template>
  <!-- Grupo de entrada com select e botão -->
  <div class="input-group mb-3">
    <!-- Select para exibir as sugestões de tarefas -->
    <select v-model="selectedTask" class="form-select mt-2 me-2">
      <!-- Opções do select geradas dinamicamente com base no array de sugestões -->
      <option v-for="task in taskSuggestions" :key="task.id" :value="task">
        {{ task.title }}
      </option>
    </select>
    <!-- Botão para adicionar a tarefa selecionada -->
    <button @click="addSelectedTask" class="btn mt-2 btn-two">Sugestões de Tarefas</button>
  </div>
</template>

<script>
export default {
  // Dados reativos do componente
  data() {
    return {
      taskSuggestions: [], // Armazena as sugestões de tarefas retornadas pela API
      selectedTask: null   // Armazena a tarefa selecionada no select
    };
  },
  methods: {
    /**
     * Método para buscar sugestões de tarefas de uma API externa.
     * Faz um filtro para incluir apenas as tarefas que não foram concluídas (completed: false).
     */
    async fetchTaskSuggestion() {
      try {
        // Faz a requisição para a API
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        // Filtra apenas as tarefas não concluídas
        this.taskSuggestions = data.filter(task => !task.completed);
      } catch (error) {
        // Loga o erro caso a requisição falhe
        console.error('Erro ao buscar sugestões de tarefas:', error);
      }
    },
    /**
     * Método para emitir a tarefa selecionada como um evento para o componente pai.
     * Também limpa a seleção após a tarefa ser emitida.
     */
    addSelectedTask() {
      if (this.selectedTask) {
        // Emite o evento 'add-task' com os dados da tarefa selecionada
        this.$emit('add-task', { text: this.selectedTask.title, completed: false });
        // Reseta a seleção após o envio
        this.selectedTask = null;
      }
    }
  },
  /**
   * Hook de ciclo de vida do Vue.
   * Chamado quando o componente é montado no DOM.
   * Aqui, busca as sugestões de tarefas ao carregar o componente.
   */
  mounted() {
    
    this.fetchTaskSuggestion();
  }
};
</script>

<style>
/* Estilo personalizado para o botão */
button{
  color: white !important;
}

.btn-two {
  background-color: #607D8B !important;
}
.btn-two:hover {
  background-color: #48616d !important; 
}
</style>
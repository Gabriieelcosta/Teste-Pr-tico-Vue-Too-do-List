<template>
  <!-- Container principal da aplicação -->
  <div class="container mt-5">
    <!-- Bloco com fundo claro e bordas arredondadas -->
    <div class="bg-light p-4 text-dark border border-secondary rounded">
      <!-- Título principal -->
      <h1 class="text-center mb-4">To-Do List</h1>

      <!-- Entrada para adicionar nova tarefa -->
      <div class="input-group mb-3">
        <!-- Campo de texto vinculado ao modelo 'newTask' -->
        <input
          v-model="newTask"
          type="text"
          class="form-control me-2"
          placeholder="Adicionar nova tarefa"
        />
        <!-- Botão para adicionar a tarefa -->
        <button @click="addTask" class="btn btn-one">Adicionar</button>
      </div>

      <!-- Componente TaskApi que emite eventos de tarefas vindas da API -->
      <TaskApi @add-task="addTaskFromApi" />

      <!-- Subtítulo para a lista de tarefas -->
      <h2 class="mt-4 mb-3 text-center">Minhas Tarefas</h2>

      <!-- Lista das tarefas adicionadas -->
      <ul class="list-group mt-3">
        <!-- Renderização de tarefas individuais -->
        <li
          v-for="(task, index) in tasks"
          :key="index"
          :class="[
            'list-group-item',
            task.completed ? 'list-group-item-success' : '',
            'task-item',
          ]"
        >
          <!-- Linha com alinhamento de elementos -->
          <div class="row d-flex align-items-center">
            <div class="col-lg-8">
              <!-- Exibição do texto da tarefa -->
              <span>{{ task.text }}</span>
            </div>
            <div class="col-lg-4 d-flex justify-content-end">
              <!-- Botão para marcar a tarefa como concluída -->
              <button
                @click="toggleTaskCompletion(task)"
                class="btn btn-sm mb-md-0 m-1 btn-success"
              >
                Concluir
              </button>
              <!-- Botão para remover a tarefa -->
              <button
                @click="removeTask(index)"
                class="btn btn-sm mb-md-0 m-1 btn-remove"
              >
                Remover
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Importa o componente que busca tarefas de uma API
import TaskApi from "./TaskApi.vue";

export default {
  // Declaração dos componentes utilizados
  components: {
    TaskApi,
  },
  data() {
    return {
      newTask: "", // Armazena o texto da nova tarefa a ser adicionada
      tasks: [], // Lista de tarefas
    };
  },
  methods: {
    /**
     * Adiciona uma nova tarefa à lista.
     * Limpa o campo de entrada após a adição e salva no localStorage.
     */
    addTask() {
      if (this.newTask.trim() !== "") {
        this.tasks.push({ text: this.newTask, completed: false });
        this.newTask = "";
        this.saveTasks();
      }
    },
    /**
     * Adiciona uma tarefa recebida do componente filho (TaskApi).
     * Também salva a lista de tarefas no localStorage.
     */
    addTaskFromApi(task) {
      this.tasks.push(task);
      this.saveTasks();
    },
    /**
     * Alterna o estado de conclusão de uma tarefa.
     * Salva as alterações no localStorage.
     */
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
      this.saveTasks();
    },
    /**
     * Remove uma tarefa da lista com base no índice.
     * Salva as alterações no localStorage.
     */
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    /**
     * Salva a lista de tarefas no localStorage.
     */
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    /**
     * Carrega a lista de tarefas do localStorage ao inicializar o componente.
     */
    loadTasks() {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        this.tasks = JSON.parse(tasks);
      }
    },
  },
  /**
   * Hook do ciclo de vida 'mounted', chamado quando o componente é montado no DOM.
   * Utilizado para carregar as tarefas salvas no localStorage.
   */
  mounted() {
    this.loadTasks();
  },
};
</script>

<style scoped>
/* Estilização responsiva do container */
.container {
  max-width: 100%;
  padding: 0 15px;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media (max-width: 400px) {
  .d-flex {
    flex-direction: column;
  }
}

/* Estilo individual das tarefas */
.task-item {
  margin-bottom: 10px;
}


/* Estilização personalizada dos botões */
button {
  color: white;
}

.btn-one {
  background-color: #607d8b;
}
.btn-one:hover {
  background-color: #48616d;
  color: white;
}

.btn-remove {
  background-color: #d33838;
}
.btn-remove:hover {
  background-color: #b02b2b;
  color: white;
}

.btn-success {
  background-color: #3da744;
}
.btn-success:hover {
  background-color: #2f7e35;
  color: white;
}
</style>

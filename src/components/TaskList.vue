<template>
  <div class="container mt-5 ">
    <div class="bg-light p-4 text-dark border border-secondary rounded">
      <h1 class="text-center mb-4">To-Do List</h1>
      <div class="input-group mb-3">
        <input v-model="newTask" type="text" class="form-control me-2" placeholder="Adicionar nova tarefa" />
        <button id="btn-one" @click="addTask" class="btn ">Adicionar</button>
      </div>
      <TaskApi @add-task="addTaskFromApi" />
      <h2 class="mt-4 mb-3 text-center">Minhas Tarefas</h2>
      <ul class="list-group mt-3">
        <li v-for="(task, index) in tasks" :key="index" :class="['list-group-item', task.completed ? 'list-group-item-success' : '', 'task-item']">
          <div class="row d-flex align-items-center">
            <div class="col-lg-8">
              <span>{{ task.text }}</span>
            </div>
            <div class="col-lg-4 d-flex justify-content-end">
              <button id="btn-success" @click="toggleTaskCompletion(task)" class="btn btn-sm mb-md-0 m-1">Concluir</button>
              <button id="btn-remove" @click="removeTask(index)" class="btn  btn-sm mb-md-0 m-1">Remover</button>
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

<style scoped>
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

.task-item {
  margin-bottom: 10px; /* Adiciona um padding entre as tarefas */
}

@media (max-width: 400px) {
  .d-flex {
    flex-direction: column;
  }
}

button{
  color: white;
}

#btn-one {
  background-color: #607D8B;
}
#btn-remove {
  background-color: #683535;
}
#btn-success {
  background-color: #638065;
}
</style>
<template>
  <!-- Renderiza o componente TaskList -->
  <TaskList />
</template>

<script>
// Importa os componentes TaskList e TaskApi
import TaskList from './components/TaskList.vue';
import TaskApi from './components/TaskApi.vue';

export default {
  name: 'App',
  components: {
    TaskList,
    TaskApi
  }
};
</script>

<style>
/* Define a cor de fundo do body */
body {
  background-color: #78909C !important; /* Cor cinza */
}
</style>
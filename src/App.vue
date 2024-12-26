<template>
  <TaskList />
</template>


<script>
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

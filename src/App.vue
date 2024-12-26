<template>
  <TaksList />
</template>


<script>
import TaksList from './components/TaksList.vue';
import TaskApi from './components/TaskApi.vue';

export default {
  name: 'App',
  components: {
    TaksList,
    TaskApi
  }
};

</script>

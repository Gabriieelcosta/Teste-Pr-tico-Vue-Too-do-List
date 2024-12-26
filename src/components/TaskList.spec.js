import { mount } from '@vue/test-utils';
import TaskList from './TaskList.vue';

describe('TaskList.vue', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders a task list', () => {
    const wrapper = mount(TaskList);
    expect(wrapper.find('h1').text()).toBe('Lista de Tarefas');
  });

  it('adds a new task correctly to the list', async () => {
    const wrapper = mount(TaskList);
    const input = wrapper.find('input');
    const button = wrapper.find('button.btn-primary');

    await input.setValue('Nova Tarefa');
    await button.trigger('click');

    expect(wrapper.findAll('li').length).toBe(1);
    expect(wrapper.find('li').text()).toContain('Nova Tarefa');
  });

  it('updates localStorage after adding a new task', async () => {
    const wrapper = mount(TaskList);
    const input = wrapper.find('input');
    const button = wrapper.find('button.btn-primary');

    await input.setValue('Nova Tarefa');
    await button.trigger('click');

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks.length).toBe(1);
    expect(tasks[0].text).toBe('Nova Tarefa');
  });
});
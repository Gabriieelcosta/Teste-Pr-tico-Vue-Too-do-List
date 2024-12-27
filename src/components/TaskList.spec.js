import { mount } from '@vue/test-utils'; // Importa a função para montar componentes Vue em um ambiente de teste
import TaskList from './TaskList.vue'; // Importa o componente TaskList que será testado

// Define o bloco de testes para o componente TaskList.vue
describe('TaskList.vue', () => {
  // Limpa o localStorage antes de cada teste para evitar dados residuais de outros testes
  beforeEach(() => {
    localStorage.clear();
  });

  /**
   * Teste 1: Verifica se o componente renderiza corretamente o título da lista de tarefas.
   */
  it('renders a task list', () => {
    // Monta o componente
    const wrapper = mount(TaskList);

    // Verifica se o título "Lista de Tarefas" está presente no componente
    expect(wrapper.find('h1').text()).toBe('To-Do List');
  });

  /**
   * Teste 2: Verifica se uma nova tarefa é adicionada corretamente à lista.
   */
  it('adds a new task correctly to the list', async () => {
    // Monta o componente
    const wrapper = mount(TaskList);

    // Localiza o campo de entrada e o botão de adicionar tarefa
    const input = wrapper.find('input');
    const button = wrapper.find('button.btn-one');

    // Define o valor do campo de entrada como "Nova Tarefa" e dispara o clique no botão
    await input.setValue('Nova Tarefa');
    await button.trigger('click');

    // Verifica se a tarefa foi adicionada à lista
    expect(wrapper.findAll('li').length).toBe(1); // Deve haver 1 item na lista
    expect(wrapper.find('li').text()).toContain('Nova Tarefa'); // O texto do item deve conter "Nova Tarefa"
  });

  /**
   * Teste 3: Verifica se o localStorage é atualizado corretamente após adicionar uma nova tarefa.
   */
  it('updates localStorage after adding a new task', async () => {
    // Monta o componente
    const wrapper = mount(TaskList);

    // Localiza o campo de entrada e o botão de adicionar tarefa
    const input = wrapper.find('input');
    const button = wrapper.find('button.btn-one');

    // Define o valor do campo de entrada como "Nova Tarefa" e dispara o clique no botão
    await input.setValue('Nova Tarefa');
    await button.trigger('click');

    // Recupera os dados armazenados no localStorage e verifica se foram atualizados corretamente
    const tasks = JSON.parse(localStorage.getItem('tasks')); // Recupera a lista de tarefas do localStorage
    expect(tasks.length).toBe(1); // Deve haver 1 tarefa no localStorage
    expect(tasks[0].text).toBe('Nova Tarefa'); // O texto da tarefa deve ser "Nova Tarefa"
  });
});

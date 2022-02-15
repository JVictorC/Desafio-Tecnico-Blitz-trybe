import getAllToDos from '../../../controllers/getAllToDos';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import allToDosMock from '../../mocks/allTodos';

describe('Testa a Função getAllToDos', () => {
  beforeEach(() => {
    const mock = new MockAdapter(axios);
    mock.onGet('http://localhost:3001/toDo').reply(200, allToDosMock);
  });
  test.only('Deveria Retornar um array', async () => {
    const allToDos = await getAllToDos();
    expect(Array.isArray(allToDos)).toBe(true);
  });
});

// ref para mock axios https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest

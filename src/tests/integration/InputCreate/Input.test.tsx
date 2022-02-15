import {screen, render} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import App from '../../../App';
import {ToDoProvider} from '../../../context/toDoProvider';
import allToDosMock from '../../mocks/allTodos';

describe.only('Testa a Home', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('http://localhost:3001/toDo').reply(200, allToDosMock);
  });

  describe('Testes na criação de um ToDo', () => {
    test('deveria ter um input', async () => {
      render(
          <ToDoProvider>
            <App />
          </ToDoProvider>,
      );

      const inputCreateToDo = await screen.findByTestId(
          'input-create-new-toDo',
      );
      expect(inputCreateToDo).toBeInTheDocument();
    });

    test('deveria ter um Botão de Submit', async () => {
      render(
          <ToDoProvider>
            <App />
          </ToDoProvider>,
      );
      const inputCreateToDo = await screen.findByTestId(
          'button-create-new-toDo',
      );
      expect(inputCreateToDo).toBeInTheDocument();
    });
  });
});

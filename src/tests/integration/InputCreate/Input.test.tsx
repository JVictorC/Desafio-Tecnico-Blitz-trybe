/* eslint-disable max-len */
import {Select} from '@mui/material';
import {
  screen,
  render,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import App from '../../../App';
import {ToDoProvider} from '../../../context/toDoProvider';
import allMethods from '../../../controllers/allMethods';
import allToDosMock from '../../mocks/allTodos';
import user from '@testing-library/user-event';

describe.only('Testa a Home', () => {
  const mock = new MockAdapter(axios);
  const createToDoController = jest.spyOn(allMethods, 'createToDoController');

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    mock.onGet('http://localhost:3001/toDo').reply(200, allToDosMock);
  });

  describe('Testes na criação de um ToDo', () => {
    describe('Testes para verificar os inputs', () => {
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
        const buttonCreateToDO = await screen.findByTestId(
            'button-create-new-toDo',
        );
        expect(buttonCreateToDO).toBeInTheDocument();
      });

      test('deveria abrir um model com dois inputs para preencher as demais informações', async () => {
        render(
            <ToDoProvider>
              <App />
            </ToDoProvider>,
        );
        const inputCreateToDo = await screen.findByTestId(
            'input-create-new-toDo',
        );
        const buttonCreateToDo = await screen.findByTestId(
            'button-create-new-toDo',
        );
        expect(inputCreateToDo).toBeInTheDocument();
        expect(buttonCreateToDo).toBeInTheDocument();
        fireEvent.change(inputCreateToDo, 'Fazer Comida');
        fireEvent.click(buttonCreateToDo);

        const modelTitle = await screen.findByText(
            'Nos Inputs Abaixo Digite o Status e uma Descrição',
        );
        const modelStatus = await screen.findByTestId('input-status-new-toDo');
        const modelDescription = await screen.findByTestId(
            'input-description-new-toDo',
        );

        expect(modelTitle).toBeInTheDocument();
        expect(modelStatus).toBeInTheDocument();
        expect(modelDescription).toBeInTheDocument();
      });
    });
  });

  describe('Deveria Adicionar um novo ToDo no Banco', () => {
    test('deveria adicionar um novo ToDo', async () => {
      render(
          <ToDoProvider>
            <App />
          </ToDoProvider>,
      );
      const inputCreateToDo = await screen.findByLabelText(
          'Adicionar novo ToDo',
      );

      user.type(inputCreateToDo, 'Ir para o Cinema');

      const buttonCreateToDo = await screen.findByTestId(
          'button-create-new-toDo',
      );

      user.click(buttonCreateToDo);

      const modelStatus = screen.getByRole('combobox');
      const modelDescription = screen.getByTestId('input-description-new-toDo');

      user.type(
          modelDescription,
          'Tenho que ir ao cinema hoje as 15h da tarde',
      );

      user.selectOptions(modelStatus, screen.getByRole('option', {name: 'Concluído'}));

      const buttonSubmit = screen.getByTestId('button-submit-new-toDo');
      fireEvent.click(buttonSubmit);

      expect(createToDoController).toHaveBeenCalled();
      expect(createToDoController).toHaveBeenCalledWith({
        title: 'Ir para o Cinema',
        description: 'Tenho que ir ao cinema hoje as 15h da tarde',
        status: 'Concluído',
      });
    });
  });
});

// ref test Select https://stackoverflow.com/questions/55184037/react-testing-library-on-change-for-material-ui-select-component
// ref testes https://stackoverflow.com/questions/57946870/how-to-select-an-option-from-a-select-list-with-react-testing-library

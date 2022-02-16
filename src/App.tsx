/* eslint-disable require-jsdoc */
import {Alert, Button, Snackbar} from '@mui/material';
import React from 'react';
import useToDoProvider from './hooks/useToDoProvider';
import Home from './views/Home';

function App() {
  const todoProvider = useToDoProvider();

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={() => {}}>
        Details
      </Button>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar
        open={todoProvider.toDoHasCreated}
        autoHideDuration={5000}
        onClose={() => todoProvider.handleCloseSnackBars(5000)}
      >
        <Alert severity="success" sx={{width: '100%'}}>
          ToDo criado com sucesso
        </Alert>
      </Snackbar>
      <Snackbar
        open={todoProvider.hasErro}
        autoHideDuration={5000}
        onClose={() => todoProvider.handleCloseSnackBars(5000)}
      >
        <Alert severity="error" action={action}>
          Erro ao Criar toDo
        </Alert>
      </Snackbar>
      <Home />
    </>
  );
}

export default App;

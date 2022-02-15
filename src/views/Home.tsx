/* eslint-disable require-jsdoc */
import {Button, CircularProgress, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import useToDoProvider from '../hooks/useToDoProvider';
import iToDo from '../models/toDoInterface';
import {HomeStyled, InputStyled} from '../Style/Home/home';

export default function Home() {
  const [newToDo, setNewToDo] = useState<string>();
  const toDoProvider = useToDoProvider();

  useEffect(() => {
    if (newToDo) {
      console.log(newToDo);
    }
  }, [newToDo]);


  const handleSubmitNewToDo = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('foi enviado');
  };

  return (
    <>
      {toDoProvider.isLoading ? (
        <CircularProgress />
      ) : (
        <HomeStyled>
          <InputStyled onSubmit={handleSubmitNewToDo}>
            <TextField
              fullWidth={true}
              label="Adicionar novo ToDo"
              variant="outlined"
              data-testid="input-create-new-toDo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
                setNewToDo(e.currentTarget.value)
              )

              }
            />
            <Button
              variant="contained"
              className="button-submit"
              fullWidth={true}
              data-testid="button-create-new-toDo"
            >
              Criar Novo ToDo
            </Button>
          </InputStyled>

          {toDoProvider.toDos.map((toDo: iToDo) => (
            <li key={toDo.id}>
              <p>{toDo.title}</p>
            </li>
          ))}
        </HomeStyled>
      )}
    </>
  );
}

import {Button, CircularProgress, SelectChangeEvent, TextField} from '@mui/material';
import React, {useState} from 'react';
import DialogDescriptionAndStatus from '../components/DialogDescriptionAndStatus';
import useToDoProvider from '../hooks/useToDoProvider';
import iToDoCreate from '../models/toDoCreate';
import iToDo from '../models/toDoInterface';
import {HomeStyled, InputStyled} from '../Style/Home/home';

export default function Home() {
  const [newToDo, setNewToDo] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [status, setStatus] = useState<string>('Em Andamento');
  const toDoProvider = useToDoProvider();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const handleChangeSelectStatus = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setStatus(event.target.value as string);
  };

  // useEffect(() => {
  //   if (newToDo) {
  //     console.log(newToDo);
  //   }
  //   if (description) {
  //     console.log(description);
  //   }
  //   if (status) {
  //     console.log(status);
  //   }
  // }, [newToDo, description, status]);

  const openDialog = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleSubmitNewToDo = async (e: React.FormEvent) => {
    const newToDoCreate: iToDoCreate = {
      title: newToDo as string,
      description: description as string,
      status,
    };

    console.log(newToDoCreate);

    const returnData = await toDoProvider.createToDo(newToDoCreate);
    console.log(returnData);
  };

  return (
    <>
      {toDoProvider.isLoading ? (
        <CircularProgress />
      ) : (
        <HomeStyled>
          <DialogDescriptionAndStatus
            handleClose={handleClose}
            open={open}
            setDescription={setDescription}
            handleChangeSelectStatus={handleChangeSelectStatus}
            status={status}
            handleSubmitNewToDo={handleSubmitNewToDo}
          />

          <InputStyled onSubmit={openDialog}>
            <TextField
              id='Teste'
              fullWidth={true}
              label="Adicionar novo ToDo"
              variant="outlined"
              data-testid="input-create-new-toDo"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewToDo(e.currentTarget.value)
              }
            />
            <Button
              variant="contained"
              className="button-submit"
              fullWidth={true}
              data-testid="button-create-new-toDo"
              onClick={openDialog}
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

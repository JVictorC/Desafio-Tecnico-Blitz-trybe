import {
  Button,
  CircularProgress,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import React, {useState} from 'react';
import DialogDescriptionAndStatus from '../components/DialogDescriptionAndStatus';
import DataTable from '../components/TableToDos';
import useToDoProvider from '../hooks/useToDoProvider';
import iToDoCreate from '../models/toDoCreate';
import {HomeStyled, InputStyled, LoadingStyled, StyledTable} from '../Style/Home/home';

export default function Home() {
  const [newToDo, setNewToDo] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
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
    setOpen(false);
    setNewToDo(undefined);
    setDescription(undefined);
    setStatus('Em Andamento');
    const newToDoCreate: iToDoCreate = {
      title: newToDo as string,
      description: description as string,
      status,
    };

    await toDoProvider.createToDo(newToDoCreate);
  };

  return (
    <>
      {toDoProvider.isLoading ? (
        <LoadingStyled>
          <CircularProgress />
        </LoadingStyled>
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
              id="Teste"
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
          <StyledTable>
            <DataTable />
          </StyledTable>
        </HomeStyled>
      )}
    </>
  );
}

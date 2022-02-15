import {LoadingButton} from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import React from 'react';
import useToDoProvider from '../hooks/useToDoProvider';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import {TextFormStyled} from '../Style/Home/home';

interface iProps {
  open: boolean;
  handleClose: () => void;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleChangeSelectStatus: (event: SelectChangeEvent) => void;
  handleSubmitNewToDo: (e: React.FormEvent) => void;
  status: string;
}

export default function DialogDescriptionAndStatus(props: iProps) {
  const providerToDo = useToDoProvider();

  const {
    open,
    handleClose,
    setDescription,
    handleChangeSelectStatus,
    handleSubmitNewToDo,
    status,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{padding: '35px'}}>
        <DialogTitle id="alert-dialog-title">
          {'Nos Inputs Abaixo Digite o Status e uma Descrição'}
        </DialogTitle>
        <DialogContent>
          <TextFormStyled>
            <Box sx={{minWidth: 120}}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={handleChangeSelectStatus}
                  data-testid="input-status-new-toDo"
                  native={true}
                >
                  <option value={'Em Andamento'} data-testid='select-option'>Em Andamento</option>
                  <option value={'Concluído'} data-testid='select-option'>Concluído</option>
                </Select>
              </FormControl>
            </Box>
          </TextFormStyled>
          <TextFormStyled>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{opacity: 0.7}}
            >
              Descrição
            </Typography>
            <TextareaAutosize
              data-testid="input-description-new-toDo"
              aria-label="empty textarea"
              placeholder="Empty"
              style={{width: 350, height: 100}}
              onChange={(e: any) => setDescription(e.target.value)}
            />
          </TextFormStyled>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleClose}
            autoFocus
            loading={providerToDo.isLoading}
            loadingPosition="end"
            endIcon={<CancelIcon />}
          >
            Cancelar
          </LoadingButton>
          <LoadingButton
            onClick={handleSubmitNewToDo}
            endIcon={<SendIcon />}
            loading={providerToDo.isLoading}
            loadingPosition="end"
            variant="text"
            data-testid='button-submit-new-toDo'
          >
            Enviar
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

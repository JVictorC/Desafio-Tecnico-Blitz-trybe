import * as React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import useToDoProvider from '../hooks/useToDoProvider';
import {Button} from '@mui/material';
import iToDo from '../models/toDoInterface';

export default function DataTable() {
  const toDoProvider = useToDoProvider();

  const handleClickDeleteToDo = (toDo: iToDo) => {
    toDoProvider.deleteToDo(toDo.id);
  };

  const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 150},
    {field: 'title', headerName: 'Title', width: 150},
    {field: 'description', headerName: 'Descrição', width: 200},
    {field: 'status', headerName: 'Status', width: 130},
    {field: 'createAt', headerName: 'Criado em', width: 200},
    {field: 'updatedAt', headerName: 'Atualizado em:', width: 200},
    {
      field: 'Editar / Delete',
      headerName: 'Editar / Delete',
      description: 'Essa coluna ira delete e editar um toDo',
      sortable: false,
      width: 160,
      renderCell: (params: GridRenderCellParams<any, iToDo, any>) => {
        return (
          <>
            <Button color="error" onClick={() => handleClickDeleteToDo(params.row)}>
              Excluir
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div style={{height: '100%', width: '100%'}}>
      <DataGrid
        rows={toDoProvider.toDos}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[10]}
        checkboxSelection
        autoHeight={true}
      />
    </div>
  );
}

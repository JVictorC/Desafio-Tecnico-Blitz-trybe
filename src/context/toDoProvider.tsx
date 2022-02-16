/* eslint-disable require-jsdoc */
import React, {createContext, useCallback, useEffect, useState} from 'react';
import allMethods from '../controllers/allMethods';
import iToDoCreate from '../models/toDoCreate';
import iToDo from '../models/toDoInterface';

interface iProps {
  children: JSX.Element;
}

interface iToDoContext {
  isLoading: boolean;
  toDoHasCreated: boolean;
  hasErro: boolean;
  toDoHasBeenDeleted: boolean;
  toDos: iToDo[];
  handleCloseSnackBars: (timerOut: number) => void;
  createToDo: (newToDo: iToDoCreate) => Promise<iToDo | void>;
  deleteToDo: (id: string) => Promise<{} | void>;
}

const toDoContext = createContext<iToDoContext>({
  isLoading: false,
  toDoHasCreated: false,
  toDoHasBeenDeleted: false,
  hasErro: false,
  toDos: [],
  handleCloseSnackBars: (timerOut: number) => {},
  createToDo: async (newToDo: iToDoCreate) => {},
  deleteToDo: async (id: string) => {},
});

export function ToDoProvider(props: iProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toDoHasCreated, setToDoHasCreated] = useState<boolean>(false);
  const [toDoHasBeenDeleted, setToDoHasBeenDeleted] = useState<boolean>(false);
  const [hasErro, setHasErro] = useState<boolean>(false);
  const [toDos, setToDos] = useState<iToDo[]>([]);

  const handleCloseSnackBars = (timerOut: number) => {
    setToDoHasCreated(false);
    setHasErro(false);
    setToDoHasBeenDeleted(false);
  };

  const deleteToDo = async (id: string) => {
    await allMethods.deleteToDoController(id);
    setToDoHasBeenDeleted(true);
    await getAll();
  };

  const createToDo = async (newToDo: iToDoCreate) => {
    const response = await allMethods.createToDoController(newToDo);

    if (response) {
      setToDoHasCreated(true);
      await getAll();
    } else {
      setHasErro(true);
    }
  };

  const getAll = useCallback(async () => {
    setIsLoading(true);
    const toDos = await allMethods.getAllToDos();
    setIsLoading(false);
    setToDos(toDos);
  }, []);

  useEffect(() => {
    getAll();
  }, []);

  const valueProvider: iToDoContext = {
    isLoading,
    toDoHasCreated,
    hasErro,
    toDos,
    toDoHasBeenDeleted,
    createToDo,
    deleteToDo,
    handleCloseSnackBars,
  };

  return (
    <toDoContext.Provider value={valueProvider}>
      {props.children}
    </toDoContext.Provider>
  );
}

export default toDoContext;

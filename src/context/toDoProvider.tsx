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
  toDos: iToDo[];
  handleCloseSnackBars: (timerOut: number) => void;
  createToDo: (newToDo: iToDoCreate) => Promise<iToDo | void>;
}

const toDoContext = createContext<iToDoContext>({
  isLoading: false,
  toDoHasCreated: false,
  hasErro: false,
  toDos: [],
  handleCloseSnackBars: (timerOut: number) => {},
  createToDo: async (newToDo: iToDoCreate) => {},
});

export function ToDoProvider(props: iProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toDoHasCreated, setToDoHasCreated] = useState<boolean>(false);
  const [hasErro, setHasErro] = useState<boolean>(false);
  const [toDos, setToDos] = useState<iToDo[]>([]);

  const handleCloseSnackBars = (timerOut: number) => {
    setToDoHasCreated(false);
    setHasErro(false);
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
    createToDo,
    handleCloseSnackBars,
  };

  return (
    <toDoContext.Provider value={valueProvider}>
      {props.children}
    </toDoContext.Provider>
  );
}

export default toDoContext;

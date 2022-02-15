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
  toDos: iToDo[];
  createToDo: (newToDo: iToDoCreate) => Promise<iToDo | void>;
}

const toDoContext = createContext<iToDoContext>({
  isLoading: false,
  toDos: [],
  createToDo: async (newToDo: iToDoCreate) => {},
});

export function ToDoProvider(props: iProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toDos, setToDos] = useState<iToDo[]>([]);

  const createToDo = async (newToDo: iToDoCreate) => {
    const response = await allMethods.createToDoController(newToDo);
    return response;
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
    toDos,
    createToDo,
  };

  return (
    <toDoContext.Provider value={valueProvider}>
      {props.children}
    </toDoContext.Provider>
  );
}

export default toDoContext;

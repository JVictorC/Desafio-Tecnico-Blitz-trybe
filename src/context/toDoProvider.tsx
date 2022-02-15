/* eslint-disable require-jsdoc */
import React, {createContext, useCallback, useEffect, useState} from 'react';
import getAllToDos from '../controllers/getAllToDos';
import iToDo from '../models/toDoInterface';

interface iProps {
  children: JSX.Element;
}

interface iToDoContext {
  isLoading: boolean;
  toDos: iToDo[]
}

const toDoContext = createContext<iToDoContext>({
  isLoading: false,
  toDos: [],
});

export function ToDoProvider(props: iProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toDos, setToDos] = useState<iToDo[]>([]);

  const getAll = useCallback(async () => {
    setIsLoading(true);
    const toDos = await getAllToDos();
    setIsLoading(false);
    setToDos(toDos);
  }, []);

  useEffect(() => {
    getAll();
  }, []);


  const valueProvider: iToDoContext = {
    isLoading,
    toDos,
  };

  return (
    <toDoContext.Provider value={valueProvider}>
      {props.children}
    </toDoContext.Provider>
  );
}

export default toDoContext;

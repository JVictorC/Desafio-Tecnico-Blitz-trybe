import React, { createContext } from 'react';

interface iProps {
  children: JSX.Element
}

const toDoContext = createContext({});

export function ToDoProvider(props: iProps) {
  const valueProvider = {};

  return (
    <toDoContext.Provider value={valueProvider}>
      {props.children}
    </toDoContext.Provider>
  );
}

export default toDoContext
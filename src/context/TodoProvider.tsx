import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createTodo, getTodoList } from '../api/todo';
import { TodoTypes } from '../types/todo';
import { TodoContextType, TodoDispatchType } from '../types/context';

const TodoContext = createContext<TodoContextType | null>(null);
const TodoDispatchContext = createContext<TodoDispatchType | null>(null);

export function TodoProvider({ children }: React.PropsWithChildren) {
  const [inputText, setInputText] = useState('');
  const [todoListData, setTodoListData] = useState<TodoTypes[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        inputText,
        todoListData,
      }}
    >
      <TodoDispatchContext.Provider
        value={{
          setInputText,
          setTodoListData,
        }}
      >
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}

export const useTodoState = () => {
  const state = useContext(TodoContext);
  if (!state) {
    throw new Error('TodoContextProvider not found');
  }
  return state;
};

export const useTodoDispatch = () => {
  const state = useContext(TodoDispatchContext);
  if (!state) {
    throw new Error('TodoDispatchContextProvider not found');
  }
  return state;
};

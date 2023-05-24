import { TodoTypes } from './todo';

export interface TodoContextType {
  inputText: string;
  todoListData: TodoTypes[];
}

export interface TodoDispatchType {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setTodoListData: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
}

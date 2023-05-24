import { TodoTypes } from './todo';

export interface TodoContextType {
  inputText: string;
  todoListData: TodoTypes[];
  isAddLoading: boolean;
}

export interface TodoDispatchType {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setTodoListData: React.Dispatch<React.SetStateAction<TodoTypes[]>>;
  handleSubmit: (event: React.FormEvent) => Promise<void>;
}

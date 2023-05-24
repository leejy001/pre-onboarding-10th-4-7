import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { TodoItemTypes, TodoTypes } from '../types/todo';
import TrashIcon from '../icon/TrashIcon';
import SpinnerIcon from '../icon/SpinnerIcon';
import { deleteTodo } from '../api/todo';
import { useTodoDispatch } from '../context/TodoProvider';

const TodoItem = ({ id, title }: TodoItemTypes) => {
  const { setTodoListData } = useTodoDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveTodo = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        await deleteTodo(id);

        setTodoListData(prev => prev.filter((item: TodoTypes) => item.id !== id));
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    },
    [setTodoListData]
  );

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <Item>
      <ItemTitle>{title}</ItemTitle>
      <ItemOption>
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo(id)}>
            <TrashIcon />
          </button>
        ) : (
          <SpinnerIcon />
        )}
      </ItemOption>
    </Item>
  );
};

export default TodoItem;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  list-style-type: none;
  padding: 17px 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.COLOR_GRAY_2};
  font-size: 1.2rem;
  letter-spacing: 1.5px;
  &:hover {
    opacity: 0.85;
    background-color: ${({ theme }) => theme.color.COLOR_GRAY_2};
  }
`;

const ItemTitle = styled.p`
  word-break: break-all;
  white-space: break-word;
  text-overflow: ellipsis;
`;

const ItemOption = styled.div`
  float: right;
  button {
    background-color: ${({ theme }) => theme.color.COLOR_NONE};
    border: none;
    cursor: pointer;
  }
`;

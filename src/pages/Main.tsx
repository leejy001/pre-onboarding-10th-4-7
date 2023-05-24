import { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import useFocus from '../hooks/useFocus';
import useSearchdata from '../hooks/useSearchData';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import DropDown from '../components/DropDown';
import { useTodoDispatch, useTodoState } from '../context/TodoProvider';
import { createTodo } from '../api/todo';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Main = () => {
  const { isTotal, isSearchLoading, searchListData, handleSearchFetch } = useSearchdata();
  const { inputText } = useTodoState();
  const { setInputText, setTodoListData } = useTodoDispatch();
  const { ref: inputRef, setFocus: setInputFocus } = useFocus();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent, inputText: string) => {
      try {
        e.preventDefault();
        if (isAddLoading) return;

        const trimmed = inputText.trim();
        if (!trimmed) return alert('Please write something');
        setIsAddLoading(true);
        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);
        if (data) return setTodoListData(prev => [...prev, data]);
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsAddLoading(false);
      }
    },
    [isAddLoading, setInputText, setTodoListData]
  );

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && !isTotal && !isSearchLoading) {
      handleSearchFetch('scroll', inputText);
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        inputRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef, inputRef]);

  return (
    <Container>
      <Inner>
        <Header />
        <InputTodo
          inputText={inputText}
          setInputText={setInputText}
          isAddLoading={isAddLoading}
          inputRef={inputRef}
          setInputFocus={setInputFocus}
          handleInputClick={handleInputClick}
          handleSearchFetch={handleSearchFetch}
          handleSubmit={handleSubmit}
        />
        {isDropdownOpen && inputText && searchListData.length > 0 && (
          <DropDown
            dropdownRef={dropdownRef}
            setTarget={setTarget}
            searchListData={searchListData}
            inputText={inputText}
            isTotal={isTotal}
            isSearchLoading={isSearchLoading}
            handleSubmit={handleSubmit}
          />
        )}
        <TodoList />
      </Inner>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Inner = styled.div`
  width: 100%;
  padding: 8rem 10px 4rem;
  position: relative;
`;

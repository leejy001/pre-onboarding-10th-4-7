import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import useFocus from '../hooks/useFocus';
import useSearchdata from '../hooks/useSearchData';
import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import DropDown from '../components/DropDown';
import { useTodoState } from '../context/TodoProvider';

const Main = () => {
  const { inputText } = useTodoState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { ref: inputRef, setFocus: setInputFocus } = useFocus();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const { isTotal, isSearchLoading, searchListData, handleSearchFetch } = useSearchdata();

  const handleInputClick = () => {
    setIsDropdownOpen(true);
  };

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
          inputRef={inputRef}
          setInputFocus={setInputFocus}
          handleInputClick={handleInputClick}
          handleSearchFetch={handleSearchFetch}
        />
        {isDropdownOpen && inputText && searchListData.length > 0 && (
          <DropDown
            dropdownRef={dropdownRef}
            searchListData={searchListData}
            inputText={inputText}
            isTotal={isTotal}
            isSearchLoading={isSearchLoading}
            handleSearchFetch={handleSearchFetch}
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

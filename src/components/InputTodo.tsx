import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputTodoType } from '../types/dropdown';
import useDebounce from '../hooks/useDebounce';
import PlusIcon from '../icon/PlusIcon';
import SpinnerIcon from '../icon/SpinnerIcon';

const InputTodo = ({
  inputText,
  setInputText,
  inputRef,
  isAddLoading,
  setInputFocus,
  handleInputClick,
  handleSearchFetch,
  handleSubmit,
}: InputTodoType) => {
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearch = useDebounce(inputText, 500);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    handleSearchFetch('first', inputText);
  }, [debouncedSearch]);

  useEffect(() => {
    setInputFocus();
  }, [setInputFocus]);

  return (
    <FormContainer onSubmit={e => handleSubmit(e, inputText)} isFocused={isFocused}>
      <InputText
        placeholder="Add new todo..."
        ref={inputRef}
        value={inputText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={e => setInputText(e.target.value)}
        onClick={handleInputClick}
        disabled={isAddLoading}
      />
      {!isAddLoading ? (
        <InputSubmit type="submit">
          <PlusIcon />
        </InputSubmit>
      ) : (
        <SpinnerIcon />
      )}
    </FormContainer>
  );
};

export default InputTodo;

const FormContainer = styled.form<{ isFocused: boolean }>`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  border-radius: 6px;
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.color.COLOR_GRAY_5 : theme.color.COLOR_GRAY_4)};
  justify-content: space-evenly;
  &:hover {
    border: 3px solid ${({ theme }) => theme.color.COLOR_GRAY_4};
    margin-top: -2px;
    margin-bottom: 18px;
  }
`;

const InputText = styled.input`
  font-size: 1rem;
  font-weight: 400;
  width: 85%;
  padding-right: 5px;
  padding-left: 10px;
  height: 45px;
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.color.COLOR_NONE};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InputSubmit = styled.button`
  background: ${({ theme }) => theme.color.COLOR_NONE};
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 45px;
  outline: none;
  border: none;
`;

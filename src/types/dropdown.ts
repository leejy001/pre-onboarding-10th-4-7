export interface DropdownType {
  dropdownRef: React.RefObject<HTMLUListElement>;
  setTarget: React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>;
  searchListData: string[];
  inputText: string;
  isTotal: boolean;
  isSearchLoading: boolean;
  handleSubmit: (event: React.FormEvent, inputText: string) => Promise<void>;
}

export interface HighlightType {
  text: string;
  highlight: string;
}

export interface InputTodoType {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
  isAddLoading: boolean;
  setInputFocus: () => void;
  handleInputClick: () => void;
  handleSearchFetch: (type: string, inputText: string) => Promise<void>;
  handleSubmit: (event: React.FormEvent, inputText: string) => Promise<void>;
}

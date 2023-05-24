export interface DropdownType {
  dropdownRef: React.RefObject<HTMLUListElement>;
  searchListData: string[];
  inputText: string;
  isTotal: boolean;
  isSearchLoading: boolean;
  handleSearchFetch: (type: string, inputText: string) => Promise<void>;
}

export interface HighlightType {
  text: string;
  highlight: string;
}

export interface InputTodoType {
  inputRef: React.RefObject<HTMLInputElement>;
  setInputFocus: () => void;
  handleInputClick: () => void;
  handleSearchFetch: (type: string, inputText: string) => Promise<void>;
}

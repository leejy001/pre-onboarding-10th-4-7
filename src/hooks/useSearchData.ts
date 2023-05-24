import { useState } from 'react';
import { searchTodoList } from '../api/todo';

function useSearchdata() {
  const [isTotal, setIsTotal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchListData, setSearchListData] = useState<string[]>([]);

  const handleSearchFetch = async (type: string, inputText: string) => {
    if (inputText.trim() === '') {
      setSearchListData([]);
      return;
    }
    if (type === 'first') {
      setCurrentPage(1);
      setSearchListData([]);
    }
    if (type === 'scroll') setCurrentPage(prev => prev + 1);
    setIsSearchLoading(true);
    const updateCurrentPage = type === 'scroll' ? currentPage + 1 : 1;
    const { data } = await searchTodoList({ q: inputText, page: updateCurrentPage, limit: 10 });
    setSearchListData(prev => [...prev, ...data.result]);
    setIsTotal(data.page * data.limit >= data.total);
    setIsSearchLoading(false);
  };
  return {
    isTotal,
    isSearchLoading,
    searchListData,
    handleSearchFetch,
  };
}

export default useSearchdata;

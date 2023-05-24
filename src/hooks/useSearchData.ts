import { useState } from 'react';
import { searchTodoList } from '../api/todo';
import { getCache, setCache } from '../utils/cache';

function useSearchdata() {
  const [isTotal, setIsTotal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchListData, setSearchListData] = useState<string[]>([]);

  const getSearchData = async (currentPage: number, inputText: string) => {
    const cacheData = await getCache(inputText + currentPage);
    if (!cacheData) {
      const { data } = await searchTodoList({ q: inputText, page: currentPage, limit: 10 });
      setCache(inputText + currentPage, data, 60 * 1000);
      return data;
    }
    return cacheData;
  };

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
    const searchData = await getSearchData(updateCurrentPage, inputText);
    setSearchListData(prev => [...prev, ...searchData.result]);
    setIsTotal(searchData.page * searchData.limit >= searchData.total);
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

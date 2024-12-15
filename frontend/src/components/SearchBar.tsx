import { Input } from "@/components/ui/input"
import { useState, useCallback, useEffect } from "react"
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(() => {
    // 로컬 스토리지에서 이전 검색어 로드
    return localStorage.getItem('lastSearchTerm') || "";
  });


  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
      localStorage.setItem('lastSearchTerm', value);
    }, 400),
    [onSearch]
  );


  useEffect(() => {
    // 컴포넌트 마운트 시 이전 검색어로 검색 수행
    if (searchTerm) {
      onSearch(searchTerm);
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return <Input
    type="text"
    placeholder="Search Book"
    value={searchTerm}
    onChange={handleSearch}
  />
}

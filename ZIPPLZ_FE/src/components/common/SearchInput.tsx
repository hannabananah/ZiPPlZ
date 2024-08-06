import { KeyboardEvent, useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  inputClassName?: string;
}

export default function SearchInput({
  placeholder = '검색어를 입력하세요.',
  onSearch,
  inputClassName = '',
}: SearchInputProps) {
  const [value, setValue] = useState('');

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onSearch && e.key === 'Enter') {
      onSearch(value);
    }
  };

  const handleButtonClick = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleReset = () => {
    setValue('');
  };

  return (
    <div className="relative flex items-center">
      <button
        className="absolute left-0 px-4 top-3 text-zp-gray focus:outline-none"
        onClick={handleButtonClick}
      >
        <IoIosSearch size={20} fill="#73744a" />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`rounded-zp-radius-big border w-full pl-10 pr-4 py-2 text-zp-gray placeholder-zp-light-gray focus:outline-none ${inputClassName}`}
        onKeyDown={handleSearch}
      />
      <button className="absolute right-2 top-2.5" onClick={handleReset}>
        <IoIosClose size={24} fill="#73744a" />
      </button>
    </div>
  );
}

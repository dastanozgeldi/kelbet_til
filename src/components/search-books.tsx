import { Icons } from "./icons";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const SearchBooks = ({ searchValue, setSearchValue }: Props) => {
  return (
    <div className="relative">
      <input
        id="search"
        className="pl-12 w-full p-3 my-6 rounded-lg border-[3px] border-[#6C63FF]"
        type="text"
        placeholder="Кітап немесе автордың атын енгізіңіз..."
        aria-label="Кітап немесе автордың атын енгізіңіз..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <label htmlFor="search">
        <Icons.search
          className="absolute left-4 top-1/2 -translate-y-1/2"
          size={20}
        />
      </label>
    </div>
  );
};

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface IPokemonSearchProps {
  onSearch: (value: string) => void;
}

const PokemonSearch = ({ onSearch }: IPokemonSearchProps) => {
  const [searchValue, setSearchValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-[400px] flex gap-2 items-center mb-6"
    >
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button>Search</Button>
    </form>
  );
};

export default PokemonSearch;

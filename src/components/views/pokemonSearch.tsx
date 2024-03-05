import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

interface IPokemonSearchProps {
  defaultSearchValue?: string;
}

const PokemonSearch = ({ defaultSearchValue = "" }: IPokemonSearchProps) => {
  const [searchValue, setSearchValue] = useState(defaultSearchValue);

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchValue) {
      router.push(`${router.asPath.split("?")[0]}`, undefined, {
        shallow: true,
      });
      return;
    }

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...(searchValue ? { search: searchValue } : {}),
        },
      },
      undefined,
      { shallow: true }
    );
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

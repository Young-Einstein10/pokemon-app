import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TypeDetails, useGetPokemonTypeDetails } from "@/hooks/pokemon";
import Pagination from "@/components/ui/pagination";
import PokemonList from "@/components/views/pokemonList";
import PokemonSearch from "@/components/views/pokemonSearch";

const TypeDetails = () => {
  const router = useRouter();
  const { name } = router.query;

  const { data, error, isLoading } = useGetPokemonTypeDetails(name as string);
  const [dataSource, setDataSource] = useState<TypeDetails["pokemon"]>(
    () => data?.pokemon || []
  );

  useEffect(() => {
    if (data?.pokemon) {
      setDataSource(data?.pokemon);
    }
  }, [data?.pokemon]);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 25;

  const endOffset = itemOffset + itemsPerPage;

  const currentPokemons = dataSource.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataSource.length! / itemsPerPage);

  const handleSearch = (value: string) => {
    // Use original data to filter
    const results = data?.pokemon.filter((d) =>
      d.pokemon.name.toLowerCase().includes(value)
    );
    setDataSource(results?.length ? results : []);
  };

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % dataSource.length!;
    setItemOffset(newOffset);
  };

  if (error)
    return (
      <div className="container px-4 py-10 text-2xl font-medium text-destructive">
        Failed to load
      </div>
    );
  if (isLoading)
    return (
      <div className="container px-4 py-10 text-2xl font-medium">
        Loading...
      </div>
    );

  return (
    <div className="container px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">
        All Pokemons under – {name}
      </h1>

      <div>
        <PokemonSearch onSearch={handleSearch} />
        <PokemonList currentPokemons={currentPokemons} />
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default TypeDetails;

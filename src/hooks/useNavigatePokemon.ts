import { TypeDetails } from "./pokemon";

interface IPokemonListProps {
  pokemonList?: TypeDetails["pokemon"];
}

export function useNavigatePokemons({ pokemonList }: IPokemonListProps) {
  if (pokemonList?.length === 0 || !pokemonList) {
    return {};
  }

  const lastIndex = pokemonList?.length - 1;

  const getPreviousPokemon = (idx: number): string => {
    if (idx < 1) return "";
    return pokemonList[idx - 1].pokemon.name;
  };

  const getNextPokemon = (idx: number): string => {
    if (idx === lastIndex) return "";
    return pokemonList[idx + 1].pokemon.name;
  };

  return { lastIndex, getPreviousPokemon, getNextPokemon };
}

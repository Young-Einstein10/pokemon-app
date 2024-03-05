import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface IResponse {
  count: number;
  next?: string;
  previous?: string;
  results: IPokemonTypes[];
}

export interface IPokemonTypes {
  name: string;
  url: string;
}

export function useGetPokemonTypes() {
  const { data, error, isLoading } = useSWR<IResponse>(
    "https://pokeapi.co/api/v2/type",
    fetcher
  );

  return {
    types: data?.results,
    isLoading,
    error,
  };
}

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  order: number;
  base_experience: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

/**
 * @param name Name of pokemon e.g bulbasaur
 * @description To get pokemon details
 */
export function useGetPokemonDetails(pokemon: string) {
  const { data, error, isLoading } = useSWR<PokemonDetail>(
    pokemon ? `https://pokeapi.co/api/v2/pokemon/${pokemon}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}

export interface TypeDetails {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

export function useGetPokemonTypeDetails(name: string) {
  const { data, error, isLoading } = useSWR<TypeDetails>(
    name ? `https://pokeapi.co/api/v2/type/${name}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TypeDetails } from "@/hooks/pokemon";
import { useNavigatePokemons } from "@/hooks/useNavigatePokemon";

interface IPokemonListProps {
  currentPokemons: TypeDetails["pokemon"];
}

const PokemonList = ({ currentPokemons }: IPokemonListProps) => {
  const router = useRouter();

  const { lastIndex, getNextPokemon, getPreviousPokemon } = useNavigatePokemons(
    { pokemonList: currentPokemons }
  );

  const generateHref = (idx: number, pokemon: TypeDetails["pokemon"][0]) => {
    if (idx < 1 || idx === lastIndex) {
      return `${router.asPath}/${pokemon.pokemon.name}`;
    }

    return `${router.asPath}/${pokemon.pokemon.name}?previous=${
      getPreviousPokemon && getPreviousPokemon(idx)
    }&next=${getNextPokemon && getNextPokemon(idx)}`;
  };

  if (currentPokemons.length === 0) {
    return <div className="text-lg font-medium">😭 - NO DATA</div>;
  }

  return (
    <ul className="list-disc ml-6">
      {currentPokemons?.map((pokemon, idx) => {
        const href = generateHref(idx, pokemon);

        return (
          <li key={pokemon.pokemon.name}>
            <Link href={href} className="text-lg hover:underline">
              {pokemon.pokemon.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonList;

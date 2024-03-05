import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TypeDetails } from "@/hooks/pokemon";

interface IPokemonListProps {
  currentPokemons: TypeDetails["pokemon"];
}

const PokemonList = ({ currentPokemons }: IPokemonListProps) => {
  const router = useRouter();
  return (
    <ul className="list-disc ml-6">
      {currentPokemons?.map((pokemon) => (
        <li key={pokemon.pokemon.name}>
          <Link
            href={`${router.asPath}/${pokemon.pokemon.name}`}
            className="text-lg hover:underline"
          >
            {pokemon.pokemon.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;

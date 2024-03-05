import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/errorMessage";
import Loader from "@/components/ui/loader";
import {
  useGetPokemonDetails,
  useGetPokemonTypeDetails,
} from "@/hooks/pokemon";
import { useNavigatePokemons } from "@/hooks/useNavigatePokemon";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const PokemonDetails = () => {
  const router = useRouter();
  let { name, pokemon, previous, next } = router.query;

  const { data: pokemonTypeList } = useGetPokemonTypeDetails(name as string);
  const { data, error, isLoading } = useGetPokemonDetails(pokemon as string);

  const { getPreviousPokemon, getNextPokemon } = useNavigatePokemons({
    pokemonList: pokemonTypeList?.pokemon!,
  });

  const currentPokemonIdx = pokemonTypeList?.pokemon?.findIndex(
    (d) => d.pokemon.name.toLowerCase() === pokemon
  )!;

  previous = getPreviousPokemon && getPreviousPokemon(currentPokemonIdx);
  next = getNextPokemon && getNextPokemon(currentPokemonIdx);

  if (error) return <ErrorMessage>Failed to load</ErrorMessage>;
  if (isLoading) return <Loader />;

  return (
    <div className="container flex justify-center items-center px-4 py-10">
      <div className="flex items-center gap-4">
        <Link href={`/types/${name}/${previous}`} passHref>
          <Button variant="ghost" className="p-0 w-10 h-10">
            <ChevronLeftIcon />
          </Button>
        </Link>
        <div className="shadow rounded-lg p-6 flex-1 min-w-[400px]">
          <h1 className="text-xl font-semibold mb-6">
            Pokemon Details and Stats
          </h1>

          <div>
            {data?.sprites?.other?.["official-artwork"]?.front_default && (
              <div className="flex justify-center">
                <div className="w-[150px] h-[150px] relative mb-10">
                  <Image
                    className="absolute˝"
                    src={
                      data?.sprites?.other?.["official-artwork"]?.front_default
                    }
                    alt={data?.name}
                    fill
                  />
                </div>
              </div>
            )}

            <p className="mb-2">
              <strong>Name: </strong> {data?.name}
            </p>

            <p className="mb-2">
              <strong>Height: </strong> {data?.height}
            </p>

            <p className="mb-2">
              <strong>Weight: </strong> {data?.weight}
            </p>

            <p className="mb-2">
              <strong>Experience: </strong> {data?.base_experience}
            </p>

            <div className="mt-10">
              <h3 className="font-semibold text-2xl mb-4">Abilities</h3>
              <ul className="list-disc ml-4">
                {data?.abilities.map((d) => (
                  <li key={d.ability.name}>{d.ability.name}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="font-semibold text-2xl mb-4">Stats</h3>
              <ul className="list-disc ml-4">
                {data?.stats.map((d) => (
                  <li key={d.stat.name}>
                    <strong>{d.stat.name}: </strong>
                    {d.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Link href={`/types/${name}/${next}`} passHref>
          <Button variant="ghost" className="p-0 w-10 h-10" disabled={!next}>
            <ChevronRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetails;

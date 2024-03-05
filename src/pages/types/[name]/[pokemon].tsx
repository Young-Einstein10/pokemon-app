import { useGetPokemonDetails } from "@/hooks/pokemon";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const PokemonDetails = () => {
  const router = useRouter();
  const { name, pokemon } = router.query;

  const { data, error, isLoading } = useGetPokemonDetails(pokemon as string);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="container px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">
        Pokemons Details and Stats
      </h1>

      <div>
        {data?.sprites?.other?.["official-artwork"]?.front_default && (
          <div className="w-[150px] h-[150px] relative mb-10">
            <Image
              className="absolute˝"
              src={data?.sprites?.other?.["official-artwork"]?.front_default}
              alt={data?.name}
              fill
            />
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
  );
};

export default PokemonDetails;

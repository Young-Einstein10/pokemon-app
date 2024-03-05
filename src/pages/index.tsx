import { useGetPokemonTypes } from "@/hooks/pokemon";
import Link from "next/link";
import Loader from "@/components/ui/loader";
import ErrorMessage from "@/components/ui/errorMessage";

export default function Home() {
  const { types, error, isLoading } = useGetPokemonTypes();

  if (error) return <ErrorMessage>Failed to load</ErrorMessage>;
  if (isLoading) return <Loader />;

  return (
    <div className="container px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Pokemon Types</h1>

      <div>
        <ul className="list-disc ml-6">
          {types?.map((type) => (
            <li key={type.name}>
              <Link
                href={`/types/${type.name}`}
                className="text-lg hover:underline"
              >
                {type.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

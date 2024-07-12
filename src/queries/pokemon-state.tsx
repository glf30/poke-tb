import { useQuery } from "@tanstack/react-query"

type PokemonResult = {
    name: string;
    url: string;
    details?: any;
  };
  
  type PokemonList = {
    count: number;
    next?: string;
    previous?: string;
    results: PokemonResult[];
  };


export const usePokemon = () => {
    return useQuery({
        queryKey: ['pokemon'],
        queryFn: async () => {

              const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon/?limit=500`, { cache: 'default' }
              );
              const pokemonList: PokemonList = await res.json();
      
              const pokemonListPromises = pokemonList.results.map(
                async (pokemon: PokemonResult) => {
                  return fetch(`${pokemon.url}`).then((res) => res.json());
                },
              );
      
              const pokemonData = await Promise.all(pokemonListPromises);
      
              const updatedResults = pokemonList.results.map(
                (pokemon: PokemonResult, index: number) => {
                  return { ...pokemon, details: pokemonData[index] };
                },
              );

              return updatedResults as PokemonResult[] | undefined;
          }
    })
}

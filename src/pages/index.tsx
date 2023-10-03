import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

import { api } from "~/utils/api";
import React, { useEffect, useState } from "react";
import PokemonCard from "~/components/PokemonCard";
import PokemonType from "~/components/PokemonType";
import Nav from "~/components/Nav";

import { useUser } from "@clerk/nextjs";
import CardSkeleton from "~/components/CardSkeleton";
import FilterByType from "~/components/FilterByType";

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

const pokemonTypeNames = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "flying",
  "bug",
  "poison",
  "fighting",
  "ground",
  "rock",
  "ghost",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const pokeLimit = 493;

export default function Home() {
  const { user } = useUser();

  const [isInDB, setisInDB] = useState(false);
  const [pokemonList, setPokemonList] = useState<PokemonResult[]>([]);
  const [results, setResults] = useState<PokemonResult[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [nextScroll, setNextScroll] = useState(30);
  const [searchQuery, setSearchQuery] = useState("");

  const signedInUser = api.user.getById.useQuery(user?.id as string, {
    enabled: !!user,
  });
  const addUser = api.user.userCreate.useMutation();

  useEffect(() => {
    if (user !== undefined) {
      if (signedInUser.data === undefined && isInDB === false) {
        addUser.mutate({
          username:
            (user?.username as string) ??
            `${user?.emailAddresses[0]?.emailAddress}`,
          userId: user?.id as string,
        });
        setisInDB(true);
      }
    }
  }, [user]);

  

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

 

  const handleFilterSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // if the checkbox is checked, add it to the selectedCheckboxes array
      setSelectedTypes([...selectedTypes, checkboxValue]);
    } else {
      // if the checkbox is unchecked, remove it from the selectedCheckboxes array
      setSelectedTypes((prevSelected) =>
        prevSelected.filter((item) => item !== checkboxValue),
      );
    }
  };

  const isCheckboxDisabled = (checkboxValue: string) => {
    return selectedTypes.length >= 2 && !selectedTypes.includes(checkboxValue);
  };

  const handleFilter = () => {
    //Filter main list for type, then gather results based on search query
    if (selectedTypes.length === 2) {
      setResults(
        pokemonList
          .slice()
          .filter((pokemon) => {
            if (pokemon.details.types.length === 2) {
              return (
                selectedTypes.includes(pokemon.details.types[0].type.name) &&
                selectedTypes.includes(pokemon.details.types[1].type.name)
              );
            }
          })
          .filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(searchQuery);
          }),
      );
    } else if (selectedTypes.length === 1) {
      setResults(
        pokemonList
          .slice()
          .filter((pokemon) => {
            if (pokemon.details.types.length === 2) {
              return (
                pokemon.details.types[0].type.name === selectedTypes[0] ||
                pokemon.details.types[1].type.name === selectedTypes[0]
              );
            }

            return pokemon.details.types[0].type.name === selectedTypes[0];
          })
          .filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(searchQuery);
          }),
      );
    } else {
      if (pokemonList) {
        setResults(
          pokemonList.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(searchQuery);
          }),
        );
      }
    }
  };

//  useEffect(() => {
//     handleFilter();
//   }, [searchQuery]);

  useEffect(() => {
    handleFilter();
  }, [selectedTypes, searchQuery]);

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?limit=${pokeLimit}`,
        );
        const pokemonList: PokemonList = await res.json();

        // const pokemonListPromises = pokemonList.results.map(
        //   async (pokemon: PokemonResult) => {
        //     const resPokemonInfo = await fetch(`${pokemon.url}`);
        //     return await resPokemonInfo.json();
        //   },
        // );

        // const pokemonData = await Promise.all(pokemonListPromises);

        // pokemonList.results.forEach((pokemon: PokemonResult, index: number) => {
        //   pokemon.details = pokemonData[index];
        // });

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

        setResults(updatedResults);
        setPokemonList(updatedResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPokemonData();
  }, []);

  const handleGetNext = () => {
    // less than 30 results left, make it go to the length of results and hasMore = false
    if (nextScroll + 30 > results.length) {
      setNextScroll(results.length);
    } else {
      //get next 30
      setNextScroll(nextScroll + 30);
    }

    return results.slice(0, nextScroll);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    switch (event.target.value) {
      case "NUMBER_LOW_TO_HIGH":
        setResults(
          results?.slice().sort((a, b) => a.details.id - b.details.id),
        );
        setPokemonList(
          pokemonList?.slice().sort((a, b) => a.details.id - b.details.id),
        );
        break;

      case "NUMBER_HIGH_TO_LOW":
        setResults(
          results?.slice().sort((a, b) => b.details.id - a.details.id),
        );
        setPokemonList(
          pokemonList?.slice().sort((a, b) => b.details.id - a.details.id),
        );
        break;

      case "ALPHA_A_TO_Z":
        setResults(
          results?.slice().sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }),
        );
        setPokemonList(
          pokemonList?.slice().sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          }),
        );
        break;

      case "ALPHA_Z_TO_A":
        setResults(
          results?.slice().sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          }),
        );
        setPokemonList(
          pokemonList?.slice().sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          }),
        );
        break;

      default:
        break;
    }
  };


  return (
    <>
      <Head>
        <title>PokeTB</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section id="landing" className="bg-red-500">
        <Nav />
        <header id="search">
          <div className="mx-3 flex flex-col items-center py-6">
            <h1 className="mb-6 text-center text-7xl font-bold text-neutral-900">
              Choose a Pokemon!
            </h1>
            <div className="flex w-full max-w-xl items-center rounded-full border-2 border-white bg-white p-2">
              <input
                type="text"
                className="w-full pr-8 text-center indent-5 text-2xl outline-none"
                placeholder="Enter a name to begin searching"
                onChange={handleSearchInput}
              />
            </div>
          </div>
        </header>
      </section>
      <section id="results">
        <div className="w-full py-6">
          <div className="mx-auto my-0 w-full max-w-6xl">
            <div className="flex flex-col items-center">
              {/* <div className="mx-4 flex w-full flex-col items-center bg-amber-100">
                <h1 className="m-2 text-4xl font-bold">Filter By Type</h1>
                <div id="filter">
                  <div className="my-2 flex w-full max-w-5xl flex-wrap items-center justify-center">
                    {pokemonTypeNames.map((type) => (
                      <div className="mx-2 my-2 flex justify-between">
                        <input
                          className="mx-3"
                          type="checkbox"
                          name="type-filter"
                          value={type}
                          onChange={handleFilterSelect}
                          disabled={isCheckboxDisabled(type)}
                        />
                        <PokemonType type={type} />
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}
              <FilterByType selectedTypes={selectedTypes} handleFilterSelect={handleFilterSelect} isCheckboxDisabled={isCheckboxDisabled} />
              <div className="m-4 flex flex-col md:flex-row md:space-x-2">
                <label className="mt-2 text-center text-xl font-bold">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="rounded-lg border-2 border-neutral-700 p-2"
                  onChange={handleSort}
                >
                  <option value="NUMBER_LOW_TO_HIGH">
                    Number - Low to High
                  </option>
                  <option value="NUMBER_HIGH_TO_LOW">
                    Number - High to Low
                  </option>
                  <option value="ALPHA_A_TO_Z">Name - A to Z</option>
                  <option value="ALPHA_Z_TO_A">Name - Z to A</option>
                </select>
              </div>
            </div>
            {results.length > 0 ? (
              <InfiniteScroll
                dataLength={nextScroll} //This is important field to render the next data
                next={handleGetNext}
                hasMore={nextScroll < results.length}
                loader={<h4>Loading...</h4>}
              >
                <div className="flex w-full flex-wrap justify-center">
                  {
                    results
                      ?.slice(0, nextScroll)
                      .map((pokemon: PokemonResult) => (
                        <PokemonCard {...pokemon} key={pokemon.details.id} />
                      ))
                  }
                </div>
              </InfiniteScroll>
            ) : (
              <div className="flex w-full flex-wrap justify-center">
                {pokemonList.length > 0 ? (
                  <div className="m-4 text-4xl font-bold">No results</div>
                ) : (
                  <CardSkeleton />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

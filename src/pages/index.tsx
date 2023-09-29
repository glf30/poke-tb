import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";

import { api } from "~/utils/api";
import React, { useEffect, useState } from "react";
import PokemonCard from "~/components/PokemonCard";
import PokemonType from "~/components/PokemonType";
import Nav from "~/components/Nav";

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

const pokeLimit = 1010;

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonResult[]>([]);
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const [results, setResults] = useState<PokemonResult[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [nextScroll, setNextScroll] = useState(30);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    handleFilter();
  }, [searchQuery]);

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

  useEffect(() => {
    handleFilter();
  }, [selectedTypes]);

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
    // if(nextScroll[1] !== undefined && nextScroll[0] !== undefined){
    console.log(nextScroll);
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

  useEffect(() => {}, [results]);
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
                className="w-full pr-8 indent-5 text-2xl outline-none text-center"
                placeholder="Enter a name to begin searching"
                onChange={handleSearchInput}
              />
              {/* <button type="submit" className="bg-white" onClick={handleSearch}>
                <Image
                  id="search-icon"
                  className="mr-3"
                  src="./assets/search_icon.svg"
                  width={32}
                  height={32}
                  alt=""
                />
              </button> */}
            </div>
          </div>
        </header>
      </section>
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main> */}
      <section id="results">
        <div className="w-full py-12">
          <div className="mx-auto my-0 w-full max-w-6xl">
            <div className="flex flex-col items-center">
              <div className="mx-4 flex w-full flex-col items-center bg-amber-100">
                <h1 className="text-4xl font-bold m-2">Filter By Type</h1>
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
              </div>
              <h3 className="text-center text-xl">Sort by:</h3>
              <select id="sort" className="p-2" onChange={handleSort}>
                <option value="NUMBER_LOW_TO_HIGH">Number - Low to High</option>
                <option value="NUMBER_HIGH_TO_LOW">Number - High to Low</option>
                <option value="ALPHA_A_TO_Z">Name - A to Z</option>
                <option value="ALPHA_Z_TO_A">Name - Z to A</option>
              </select>
              {/* <button
                type="button"
                className="w-1/5 rounded-3xl bg-red-500 p-3 text-white"
              >
                Go!
              </button> */}
            </div>
            <InfiniteScroll
              dataLength={nextScroll} //This is important field to render the next data
              next={handleGetNext}
              hasMore={nextScroll < results.length}
              loader={<h4>Loading...</h4>}
            >
              <div className="flex w-full flex-wrap justify-center">
                {results.length > 0 ? (
                  results
                    ?.slice(0, nextScroll)
                    .map((pokemon: PokemonResult) => (
                      <PokemonCard {...pokemon} key={pokemon.details.id} />
                    ))
                ) : (
                  <div>No results</div>
                )}

              </div>
            </InfiniteScroll>
            {/* <i class="fas fa-spinner results__loading--spinner"></i> */}
          </div>
        </div>
      </section>
    </>
  );
}
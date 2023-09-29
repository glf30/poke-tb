import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Nav from "~/components/Nav";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import PokemonType from "~/components/PokemonType";

// const PokemonInfoPage = () => {
//   const router = useRouter();
//   const { pokemon } = router.query;

//   return (
//     <>
//       <Nav />
//       <div>{pokemon}</div>
//     </>
//   );
// };

// export default PokemonInfoPage;
// const router = useRouter();
// const { pokemon } = router.query;

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking", // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = (async (context) => {
  // console.log(context.params)
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.params?.pokemon}`,
  );
  const pokemonInfo = await res.json();
  return { props: { pokemonInfo } };
}) satisfies GetStaticProps<{
  pokemonInfo: any;
}>;

export default function PokemonInfoPage({
  pokemonInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [abilities, setAbilities] = useState<string[]>([]);

  const wordFormatter = (input: string) => {
    return input
      .split("-")
      .map((word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1)
          : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join("-");
  };

  useEffect(() => {
    const abilitiesTemp: string[] = [];
    pokemonInfo.abilities.forEach((ability: { ability: { name: string } }) => {
      if (!abilitiesTemp.includes(ability.ability.name)) {
        abilitiesTemp.push(ability.ability.name);
      }
    });
    setAbilities([...abilitiesTemp]);
  }, []);

  return (
    <>
      <section id="landing" className="bg-red-500">
        <Nav />
      </section>
      {/* <div>{pokemonInfo.name}</div> */}
      <div className="w-full py-2">
        <div className="mx-auto my-0 w-full max-w-6xl">
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center text-7xl font-bold text-neutral-900">
              #{pokemonInfo.id}-{pokemonInfo.name.toUpperCase()}
            </div>
            <div className="flex flex-col md:flex-row">
              <figure className="w-1/2 rounded-lg border border-neutral-400">
                <Image
                  //  className="mr-3"
                  src={
                    pokemonInfo.sprites.other["official-artwork"]
                      .front_default ?? pokemonInfo.sprites.front_default
                  }
                  className="px-4 pb-0"
                  width={900}
                  height={0}
                  alt=""
                />
                <div className="mb-3 flex w-full justify-around">
                  <div className="flex flex-col items-center justify-center ">
                    {<div className="mb-1 font-bold">Type 1</div>}
                    <PokemonType type={pokemonInfo.types[0].type.name} />
                  </div>

                  {pokemonInfo.types.length === 2 && (
                    <div className="flex flex-col items-center justify-center">
                      {<div className="mb-1 font-bold">Type 2</div>}
                      <PokemonType type={pokemonInfo.types[1].type.name} />
                    </div>
                  )}
                </div>
              </figure>
              <div className="flex w-1/2 flex-col items-center">
                <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                  ADD TO TEAM
                </div>
                {/* Stats */}
                <div className="m-4 mb-1 text-3xl font-bold text-neutral-900">
                  BASE STATS
                </div>
                <div className="text-center">
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">HP - </span>
                    {pokemonInfo.stats[0].base_stat}
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">ATK - </span>
                    {pokemonInfo.stats[1].base_stat}
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">DEF - </span>
                    {pokemonInfo.stats[2].base_stat}
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">SP-ATK - </span>
                    {pokemonInfo.stats[3].base_stat}
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">SP-DEF - </span>
                    {pokemonInfo.stats[4].base_stat}
                  </div>
                  <div className="m-2 text-xl text-neutral-900">
                    <span className="font-bold">SPE - </span>
                    {pokemonInfo.stats[5].base_stat}
                  </div>
                </div>
                {/* Abilities */}
                <div className="text-center">
                  <div className="m-2 text-3xl font-bold text-neutral-900">
                    ABILITIES
                  </div>
                  {abilities.map((ability: string, index) => {
                    return (
                      <span className="text-xl">
                        {/* {`${ability.charAt(0).toUpperCase()}${ability
                          .slice(1)
                          .replace("-", " ")}`} */}
                        {`${wordFormatter(ability)}`}
                        {index !== abilities.length - 1 && ", "}
                      </span>
                    );
                  })}
                </div>
                <div className="flex w-full flex-col items-center">
                  <div className="m-4 mt-3 text-3xl font-bold text-neutral-900">
                    MOVES
                  </div>
                  <ul className="max-h-44 overflow-y-scroll  rounded-lg border border-neutral-400 text-left scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
                    {pokemonInfo.moves.map((move: any) => (
                      <li className="w-full px-2 ">
                        {wordFormatter(move.move.name)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

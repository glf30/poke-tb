import React, { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Nav from "~/components/Nav";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import PokemonType from "~/components/PokemonType";
import { Menu, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

type PokemonDefaultData = {
  name: string;
  ability: string;
  move: string;
};

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking", // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = (async (context) => {
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
      <div className="w-full py-2">
        <div className="mx-auto my-0 w-full max-w-6xl">
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center text-7xl font-bold text-neutral-900">
              #{pokemonInfo.id}-{pokemonInfo.name.toUpperCase()}
            </div>
            <div className="flex flex-col md:flex-row">
              <figure className="w-full max-w-sm rounded-lg border border-neutral-400 md:w-1/2 md:max-w-none">
                <Image
                  src={
                    pokemonInfo.sprites.other["official-artwork"]
                      .front_default ?? pokemonInfo.sprites.front_default
                  }
                  className="px-4 pb-0 "
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
              <div className="flex w-full flex-col items-center md:w-1/2">
                <TeamMenu
                  pokemon={{
                    name: pokemonInfo.name,
                    ability: wordFormatter(
                      pokemonInfo.abilities[0].ability.name,
                    ),
                    move: wordFormatter(pokemonInfo.moves[0].move.name),
                  }}
                />
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
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export function TeamMenu(props: { pokemon: PokemonDefaultData }) {
  const [selectedTeamId, setSelectedTeamId] = useState("");

  const { user } = useUser();
  const teams = api.teams.getUserTeamsById.useQuery(user?.id as string);

  const teamPokemon = api.pokemon.getTeamPokemonById.useQuery(selectedTeamId);

  const addPokemon = api.pokemon.pokemonCreate.useMutation();

  const handleSelect = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const successAddToTeam = () =>
    toast.success(
      `${props.pokemon.name.toUpperCase()[0]}${props.pokemon.name.slice(
        1,
      )} has been successfully added to your team!`,
      {
        position: toast.POSITION.TOP_CENTER,
      },
    );

  const failAddToTeam = () =>
    toast.error(
      `Could not add ${
        props.pokemon.name.toUpperCase()[0]
      }${props.pokemon.name.slice(1)}. Server error`,
      {
        position: toast.POSITION.TOP_CENTER,
      },
    );

  const failAddToTeamSize = () =>
    toast.error(
      `Could not add ${
        props.pokemon.name.toUpperCase()[0]
      }${props.pokemon.name.slice(1)}. This team is full`,
      {
        position: toast.POSITION.TOP_CENTER,
      },
    );

  //when data for individual team is successfully retrieved
  useEffect(() => {
    if (teamPokemon.data !== undefined && selectedTeamId !== "") {
      if (teamPokemon.data?.length <= 5) {
        addPokemon.mutate(
          {
            name: props.pokemon.name,
            teamId: selectedTeamId,
            ability: props.pokemon.ability,
            move1: props.pokemon.move,
            move2: props.pokemon.move,
            move3: props.pokemon.move,
            move4: props.pokemon.move,
          },
          {
            onSuccess: () => successAddToTeam(),
            onError: () => failAddToTeam(),
          },
        );
      } else {
        //6 - already full team
        failAddToTeamSize();
      }
      setSelectedTeamId(""); //deselect a team
    }
  }, [teamPokemon.data]);

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-center">
        <div>
          <Menu.Button
            className={`mt-4 flex h-6 items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white md:m-0 ${
              user
                ? `cursor-pointer duration-200 hover:opacity-80`
                : `cursor-not-allowed`
            }`}
          >
            ADD TO TEAM
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {teams.data?.map((team) => (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleSelect(team.teamId)}
                      className={`${
                        active ? "bg-red-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {team.teamName}
                    </button>
                  )}
                </Menu.Item>
              ))}
              
            </div>
            <div>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/${user?.id}`}
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-3 text-sm`}
                  >
                    Create New Team
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

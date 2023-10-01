import React, { Fragment, useEffect, useState } from "react";
import Nav from "~/components/Nav";
import TeamCard from "~/components/TeamCard";
import TeamPreviewView from "~/components/TeamPreviewView";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Pokemon, Team } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

type PokemonPreview = {
  name: string;
  url: string;
};

type Inputs = {
  teamname: string;
};

const TeamProfilePage = () => {
  const { query } = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [previewArray, setPreviewArray] = useState<PokemonPreview[]>([]);

  const { user } = useUser();

  //const addTeam = api.teams.teamCreate.useMutation();

  const teams = api.teams.getUserTeamsById.useQuery(
    query.userId as string,
  );

  //dependent query
  //query will only run if team has been selected
  const pokemon = api.pokemon.getTeamPokemonById.useQuery(
    selectedTeam?.teamId as string,
    { enabled: !!selectedTeam },
  );



  const handleSelectTeam = (teamId: string) => {
    setSelectedTeam(teams.data?.find((team) => team.teamId === teamId));
  };

  // set first team preview
  useEffect(() => {
    if (teams.data !== undefined) {
      setSelectedTeam(teams.data[0]);
    }
  }, [teams.data]);

  //update preview view
  useEffect(() => {
    const getTeamPokemon = async (pokemon: Pokemon[]) => {
      const promises = pokemon.map(async (pokemonData) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`,
        );
        const data = await response.json();

        return {
          name: data.name,
          url: data.sprites.front_default,
        };
      });

      const collectedData = await Promise.all(promises);
      setPreviewArray([...collectedData]);
    };

    if (pokemon.data && !pokemon.isLoading) {
      getTeamPokemon(pokemon.data);
    }
  }, [pokemon.data]);




  // useEffect(() => {
  //   // console.log("yesss")
  // },[selectedTeam])

  if (!user) return null;
  if (user.id !== query.userId) return null;

  return (
    <>
      <section id="landing" className="bg-red-500">
        <Nav />
      </section>
      {user && (
        <div className="w-full py-2">
          <div className="mx-auto my-0 w-full max-w-6xl">
            <div className="flex flex-col items-center">
              {teams.data?.length === 0 ? (
                <>
                  <div className="m-4 text-3xl font-bold text-neutral-900">
                    NO TEAMS
                  </div>
                  {/* <div className="mb-2 flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white hover:opacity-80 duration-200">
                  CREATE NEW TEAM
                </div> */}
                  <MyModal userId={user.id} />
                </>
              ) : (
                <div className="flex w-full flex-col space-x-20 md:flex-row">
                  <div className="flex w-1/2 flex-col items-center p-4">
                    <div className="m-4 text-3xl font-bold text-neutral-900">
                      MY TEAMS
                    </div>
                    {/* Team Cards */}
                    {/* <div className="mb-2 flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                      CREATE NEW TEAM
                    </div> */}
                    <MyModal userId={user.id} />

                    <div className="flex max-h-[700px] w-full flex-col items-center overflow-x-hidden overflow-y-scroll p-1 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
                      {teams.data?.map((team, index) => (
                        <TeamCard
                          name={team.teamName}
                          teamId={team.teamId}
                          key={index}
                          onClick={handleSelectTeam}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex w-1/2 flex-col items-center p-4">
                    <div className="m-4 text-3xl font-bold text-neutral-900">
                      {selectedTeam ? `${selectedTeam.teamName}` : "PREVIEW"}
                    </div>
                    {previewArray.length === 0 ? (
                      <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                        ADD POKEMON
                      </div>
                    ) : (
                      <Link href={`/teams/${user.id}/${selectedTeam?.teamId}`} className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                        GO!
                      </Link>
                    )}
                    {/* Team Preview */}
                    <div className="flex w-full flex-col flex-wrap items-center justify-center md:flex-row">
                      {previewArray.map((pokemon: PokemonPreview, index) => (
                        <TeamPreviewView
                          name={pokemon.name}
                          imgUrl={pokemon.url}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamProfilePage;


export function MyModal(props: { userId: string }) {
  let [isOpen, setIsOpen] = useState(false);

  const teams = api.teams.getUserTeamsById.useQuery(
    props.userId
  );

  const addTeam = api.teams.teamCreate.useMutation();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  //submit to DB
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addTeam.mutate({
      teamName: data.teamname,
      userId: props.userId,
    });
    teams.refetch();
  };

  function closeModal() {
    if (!errors.teamname) {
      setIsOpen(false);
    }
  }

  function openModal() {
    resetField("teamname");
    setIsOpen(true);
  }

  return (
    <>
      <div
        className="mb-2 flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white duration-200 hover:opacity-80"
        onClick={openModal}
      >
        CREATE NEW TEAM
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="fixed inset-0 overflow-y-auto"
          >
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter a Team Name:
                  </Dialog.Title>
                  <div className="m-2 flex flex-col items-center justify-center">
                    <input
                      type="text"
                      className="rounded-lg bg-neutral-200 p-2 indent-2"
                      {...register("teamname", {
                        required: true,
                        maxLength: 20,
                      })}
                      maxLength={20}
                      autoComplete="off"
                    />
                    {errors.teamname && (
                      <span className="mt-2 text-xs text-red-800">
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      CREATE TEAM
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </form>
        </Dialog>
      </Transition>
    </>
  );
}

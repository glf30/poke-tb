import React, { useEffect, useState } from "react";
import Nav from "~/components/Nav";
import TeamCard from "~/components/TeamCard";
import TeamPreviewView from "~/components/TeamPreviewView";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Pokemon, Team } from "@prisma/client";


type PokemonPreview = {
  name: string;
  url: string;
};

const TeamProfilePage = () => {
  const { query } = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [previewArray, setPreviewArray] = useState<PokemonPreview[]>([]);

  const teams = api.teams.getUserTeamsById.useQuery(query.userId as string);

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

  return (
    <>
      <section id="landing" className="bg-red-500">
        <Nav />
      </section>
      <div className="w-full py-2">
        <div className="mx-auto my-0 w-full max-w-6xl">
          <div className="flex flex-col items-center">
            {teams.data?.length === 0 ? (
              <>
                <div className="m-4 text-3xl font-bold text-neutral-900">
                  NO TEAMS
                </div>
                <div className="mb-2 flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                  CREATE NEW TEAM
                </div>
              </>
            ) : (
              <div className="flex w-full flex-col space-x-20 md:flex-row">
                <div className="flex w-1/2 flex-col items-center p-4">
                  <div className="m-4 text-3xl font-bold text-neutral-900">
                    MY TEAMS
                  </div>
                  {/* Team Cards */}
                  <div className="mb-2 flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                    CREATE NEW TEAM
                  </div>

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
                    <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                      GO!
                    </div>
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
    </>
  );
};

export default TeamProfilePage;

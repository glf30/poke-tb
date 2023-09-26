import React from "react";
import Nav from "~/components/Nav";
import Image from "next/image";

interface Pokemon {
  name: string;
  imgUrl: string;
}

interface User {
  userId: string;
  email: string;
  teams: Team[];
}

interface Team {
  teamId: string;
  userId: string;
  teamName: string;
  pokemon: Pokemon[];
}

const exampleTeam: Team = {
  teamId: "1",
  userId: "20314",
  teamName: "Cool Team 7",
  pokemon: [
    {
      name: "Venasaur",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Typhlosion",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Genesect",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Empoleon",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Kirlia",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Ceruledge",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
  ],
};

const exampleTeam2: Team = {
  teamId: "2",
  userId: "20314",
  teamName: "Cool Team 8",
  pokemon: [
    {
      name: "Charmeleon",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Entei",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Koraidon",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Solgaleo",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Litleo",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
    {
      name: "Iron-Moth",
      imgUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png",
    },
  ],
};

const exampleUser: User = {
  userId: "20314",
  email: "user@usingsite.com",
  teams: [exampleTeam, exampleTeam2],
};

const TeamProfilePage = () => {
  return (
    <>
      <section id="landing" className="bg-red-500">
        <Nav />
      </section>
      <div className="w-full py-4">
        <div className="mx-auto my-0 w-full max-w-6xl">
          <div className="flex flex-col items-center">
            <div className="flex w-full flex-col space-x-20 md:flex-row">
              <div className="flex w-1/2 flex-col items-center p-4">
                <div className="m-4 text-3xl font-bold text-neutral-900">
                  MY TEAMS
                </div>
                {/* Team Cards */}
                <div className="flex h-6 mb-2 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                  CREATE NEW TEAM
                </div>

                <div className="w-full flex flex-col items-center overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thumb-neutral-300 max-h-[700px] p-1">
                  <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
                    <h2 className="text-2xl font-bold">Team 1</h2>
                    {/* replace for trash can */}
                    <span className="flex cursor-pointer text-sm text-red-500">
                      DELETE
                    </span>
                  </div>
                  <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
                    <h2 className="text-2xl font-bold">Team 1</h2>
                    {/* replace for trash can */}
                    <span className="flex cursor-pointer text-sm text-red-500">
                      DELETE
                    </span>
                  </div>
                  <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
                    <h2 className="text-2xl font-bold">Team 1</h2>
                    {/* replace for trash can */}
                    <span className="flex cursor-pointer text-sm text-red-500">
                      DELETE
                    </span>
                  </div>
                  <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
                    <h2 className="text-2xl font-bold">Team 1</h2>
                    {/* replace for trash can */}
                    <span className="flex cursor-pointer text-sm text-red-500">
                      DELETE
                    </span>
                  </div>
                  <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
                    <h2 className="text-2xl font-bold">Team 1</h2>
                    {/* replace for trash can */}
                    <span className="flex cursor-pointer text-sm text-red-500">
                      DELETE
                    </span>
                  </div>
                  <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
                    <h2 className="text-2xl font-bold">Team 1</h2>
                    {/* replace for trash can */}
                    <span className="flex cursor-pointer text-sm text-red-500">
                      DELETE
                    </span>
                  </div>
                  <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
                    <h2 className="text-2xl font-bold">Team 1</h2>
                    {/* replace for trash can */}
                    <span className="flex cursor-pointer text-sm text-red-500">
                      DELETE
                    </span>
                  </div>
                  <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
                    <h2 className="text-2xl font-bold">Team 1</h2>
                    {/* replace for trash can */}
                    <span className="flex cursor-pointer text-sm text-red-500">
                      DELETE
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-1/2 flex-col items-center p-4">
                <div className="m-4 text-3xl font-bold text-neutral-900">
                  PREVIEW
                </div>
                <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                  GO!
                </div>
                {/* Team Preview */}
                <div className="flex w-full flex-col flex-wrap items-center justify-center md:flex-row">
                  <figure className="m-4 flex h-52 w-52 flex-col items-center justify-center rounded-lg border border-neutral-400">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={166}
                      height={166}
                    />
                    <span className="text-center text-xl font-medium text-neutral-900">
                      KLEAVOR
                    </span>
                  </figure>
                  <figure className="m-4 flex h-52 w-52 flex-col items-center justify-center rounded-lg border border-neutral-400">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={166}
                      height={166}
                    />
                    <span className="text-center text-xl font-medium text-neutral-900">
                      KLEAVOR
                    </span>
                  </figure>
                  <figure className="m-4 flex h-52 w-52 flex-col items-center justify-center rounded-lg border border-neutral-400">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={166}
                      height={166}
                    />
                    <span className="text-center text-xl font-medium text-neutral-900">
                      KLEAVOR
                    </span>
                  </figure>
                  <figure className="m-4 flex h-52 w-52 flex-col items-center justify-center rounded-lg border border-neutral-400">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={166}
                      height={166}
                    />
                    <span className="text-center text-xl font-medium text-neutral-900">
                      KLEAVOR
                    </span>
                  </figure>
                  <figure className="m-4 flex h-52 w-52 flex-col items-center justify-center rounded-lg border border-neutral-400">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={166}
                      height={166}
                    />
                    <span className="text-center text-xl font-medium text-neutral-900">
                      KLEAVOR
                    </span>
                  </figure>
                  <figure className="m-4 flex h-52 w-52 flex-col items-center justify-center rounded-lg border border-neutral-400">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={166}
                      height={166}
                    />
                    <span className="text-center text-xl font-medium text-neutral-900">
                      KLEAVOR
                    </span>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamProfilePage;

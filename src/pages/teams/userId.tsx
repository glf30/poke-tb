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
            <div className="flex flex-col md:flex-row space-x-20 w-full">
              <div className="flex w-1/2 flex-col items-center p-4">
                <div className="m-4 mb-1 w-full text-3xl font-bold text-neutral-900">
                  MY TEAMS
                </div>
                {/* Team Cards */}
              </div>

              <div className="flex w-1/2 flex-col items-center p-4">
                <div className="m-4 text-3xl font-bold text-neutral-900">
                  PREVIEW
                </div>
                <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                  GO!
                </div>
                {/* Team Preview */}
                <div className="flex flex-col flex-wrap w-full md:flex-row items-center justify-center">
                  <figure className="flex h-52 w-52 items-center justify-center rounded-lg border border-neutral-400 m-4">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={186}
                      height={186}
                    />
                  </figure>
                  <figure className="flex h-52 w-52 items-center justify-center rounded-lg border border-neutral-400 m-4">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={186}
                      height={186}
                    />
                  </figure>
                  <figure className="flex h-52 w-52 items-center justify-center rounded-lg border border-neutral-400 m-4">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={186}
                      height={186}
                    />
                  </figure>
                  <figure className="flex h-52 w-52 items-center justify-center rounded-lg border border-neutral-400 m-4">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={186}
                      height={186}
                    />
                  </figure>
                  <figure className="flex h-52 w-52 items-center justify-center rounded-lg border border-neutral-400 m-4">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={186}
                      height={186}
                    />
                  </figure>
                  <figure className="flex h-52 w-52 items-center justify-center rounded-lg border border-neutral-400 m-4">
                    <Image
                      className=""
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/900.png"
                      alt=""
                      width={186}
                      height={186}
                    />
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

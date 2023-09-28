import React, { useEffect, useState } from "react";
import Nav from "~/components/Nav";
import TeamPreviewView from "~/components/TeamPreviewView";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import PokemonType from "~/components/PokemonType";

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

const heldItems: string[] = [
  "Ability Capsule",
  "Absorb Bulb",
  "Adamant Mint",
  "Adrenaline Orb",
  "Air Balloon",
  "Amulet Coin",
  "Armorite Ore",
  "Assault Vest",
  "Babiri Berry",
  "Beast Ball",
  "Beast Boost",
  "Beast Heart",
  "Berry Juice",
  "Big Mushroom",
  "Big Nugget",
  "Big Pearl",
  "Binding Band",
  "Black Belt",
  "Black Glasses",
  "Black Sludge",
  "Blunder Policy",
  "Blue Orb",
  "Blunder Policy",
  "Bottle Cap",
  "Bright Powder",
  "Bug Gem",
  "Burn Drive",
  "Cell Battery",
  "Charcoal",
  "Charm",
  "Choice Band",
  "Choice Scarf",
  "Choice Specs",
  "Cleanse Tag",
  "Clever Feather",
  "Comet Shard",
  "Common Stone",
  "Cool Feather",
  "Destiny Knot",
  "Dire Hit",
  "Douse Drive",
  "Draco Plate",
  "Dubious Disc",
  "Dusk Stone",
  "Earth Plate",
  "Eject Button",
  "Electric Gem",
  "Electirizer",
  "Energy Powder",
  "Escape Rope",
  "Expert Belt",
  "Fairium Z",
  "Farfetch'd Stick",
  "Fire Gem",
  "Fist Plate",
  "Flame Orb",
  "Flame Plate",
  "Fleet Feather",
  "Float Stone",
  "Flying Gem",
  "Focus Band",
  "Focus Sash",
  "Full Incense",
  "Galarica Cuff",
  "Galarica Twig",
  "Ghost Gem",
  "Grass Gem",
  "Grepa Berry",
  "Grip Claw",
  "Griseous Orb",
  "Ground Gem",
  "Heal Powder",
  "Heat Rock",
  "Heavy-Duty Boots",
  "Ice Gem",
  "Icicle Plate",
  "Icy Rock",
  "Kasib Berry",
  "King's Rock",
  "Lagging Tail",
  "Lansat Berry",
  "Leftovers",
  "Leek",
  "Life Orb",
  "Light Ball",
  "Light Clay",
  "Light Stone",
  "Lucky Egg",
  "Lucky Punch",
  "Lucarionite",
  "Luminous Moss",
  "Lustrous Orb",
  "Lure",
  "Lustrous Orb",
  "Magmarizer",
  "Magnet",
  "Manectite",
  "Master Ball",
  "Max Elixir",
  "Max Ether",
  "Max Elixir",
  "Max Ether",
  "Max Potion",
  "Max Revive",
  "Mental Herb",
  "Metronome",
  "Micle Berry",
  "Mind Plate",
  "Misty Seed",
  "Moon Ball",
  "Mossy Rock",
  "Muscle Band",
  "Mystic Water",
  "Never-Melt Ice",
  "Normal Gem",
  "Odd Incense",
  "Oran Berry",
  "Passho Berry",
  "Payapa Berry",
  "Pearl",
  "Pecha Berry",
  "Persim Berry",
  "Petaya Berry",
  "Pidgeotite",
  "Pinap Berry",
  "Pink Nectar",
  "Pink Petal",
  "Poison Barb",
  "Poison Gem",
  "Poke Ball",
  "Power Herb",
  "Prism Scale",
  "Protector",
  "Psychic Seed",
  "Quick Claw",
  "Quick Powder",
  "Red Card",
  "Red Nectar",
  "Relic Band",
  "Relic Copper",
  "Relic Crown",
  "Relic Gold",
  "Relic Silver",
  "Relic Statue",
  "Relic Vase",
  "Repel",
  "Revival Herb",
  "Revive",
  "Rindo Berry",
  "Ring Target",
  "Rock Gem",
  "Rock Incense",
  "Rocky Helmet",
  "Rose Incense",
  "Roseli Berry",
  "Rowap Berry",
  "Sachet",
  "Safety Goggles",
  "Scope Lens",
  "Sea Incense",
  "Shed Shell",
  "Shell Bell",
  "Silk Scarf",
  "Silver Powder",
  "Sitrus Berry",
  "Smoke Ball",
  "Snorlium Z",
  "Snowball",
  "Soft Sand",
  "Soothe Bell",
  "Soul Dew",
  "Spell Tag",
  "Spelon Berry",
  "Splash Plate",
  "Stable Mulch",
  "Starf Berry",
  "Star Piece",
  "Steel Gem",
  "Steel Memory",
  "Stick",
  "Stone Plate",
  "Sugar Sweet",
  "Sun Stone",
  "Swampertite",
  "Swift Wing",
  "Tanga Berry",
  "Terrain Extender",
  "Throat Spray",
  "Toxic Orb",
  "Twisted Spoon",
  "Ultra Ball",
  "Water Gem",
  "Wave Incense",
  "Weakness Policy",
  "White Herb",
  "Wiki Berry",
  "Yellow Nectar",
  "Yellow Petal",
];

const natures: string[] = [
  "Adamant",
  "Bashful",
  "Bold",
  "Brave",
  "Calm",
  "Careful",
  "Docile",
  "Gentle",
  "Hardy",
  "Hasty",
  "Impish",
  "Jolly",
  "Lax",
  "Lonely",
  "Mild",
  "Modest",
  "Naive",
  "Naughty",
  "Quiet",
  "Quirky",
  "Rash",
  "Relaxed",
  "Sassy",
  "Serious",
  "Timid",
];

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

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking", // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = (async (context) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/iron-hands`);
  const pokemonInfo = await res.json();
  return { props: { pokemonInfo } };
}) satisfies GetStaticProps<{
  pokemonInfo: any;
}>;

export default function TeamEditPage({
  pokemonInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [totalEVs, setTotalEVs] = useState();
  const [currentPokemon, setCurrentPokemon] = useState(pokemonInfo);

  const [abilities, setAbilities] = useState<string[]>([
    "Hyper-Cutter",
    "Sand-Veil",
    "Poison-Heal",
  ]);

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
    console.log(currentPokemon);
  }, []);
  // useEffect(() => {
  //   const getCurrentPokemonData = async () => {
  //     const res = await fetch(
  //       `https://pokeapi.co/api/v2/pokemon/mew`,
  //     );
  //     const pokemonInfo = await res.json();
  //     setCurrentPokemon(pokemonInfo)

  //   }

  //   getCurrentPokemonData()
  //   console.log(currentPokemon)
  // },[])

  //   useEffect(() => {
  //     pokemonInfo.abilities.forEach((ability: { ability: { name: string } }) => {
  //       console.log(ability.ability.name);
  //       if (!abilities.includes(ability.ability.name)) {
  //         setAbilities([...abilities, ability.ability.name]);
  //       }
  //     });
  //   }, [abilities]);

  return (
    <>
      <section id="landing" className="bg-red-500">
        <Nav />
      </section>
      <div className="w-full py-4">
        <div className="mx-auto my-0 w-full max-w-6xl">
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center text-5xl font-bold text-neutral-900">
              MY TEAM
            </div>
            {/* PokeEdit */}
            <div className="flex w-full flex-row justify-center">
              {/* 1st column */}
              <div className="flex flex-col items-center md:flex-row md:space-x-8">
                {/* <TeamPreviewView
                  name={`SCEPTILE`}
                  imgUrl={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png"
                  }
                /> */}
                <figure className="m-4 flex h-64 w-64 flex-col items-center justify-center rounded-lg border border-neutral-400">
                  <Image
                    //  className="mr-3"
                    src={pokemonInfo.sprites.front_default}
                    className="px-4 pb-0"
                    width={196}
                    height={196}
                    alt=""
                  />
                  <span className="mb-1 text-center text-xl font-medium text-neutral-900">
                    {pokemonInfo.name.toUpperCase()}
                  </span>
                  <div className="mb-3 flex w-full justify-around">
                    <div className="flex flex-col items-center justify-center ">
                      {<div className="mb-1 text-sm font-bold">Type 1</div>}
                      <PokemonType type={pokemonInfo.types[0].type.name} />
                    </div>

                    {pokemonInfo.types.length === 2 && (
                      <div className="flex flex-col items-center justify-center">
                        {<div className="mb-1 text-sm font-bold">Type 2</div>}
                        <PokemonType type={pokemonInfo.types[1].type.name} />
                      </div>
                    )}
                  </div>
                </figure>
                <div className="flex flex-col items-center space-y-4">
                  <div>
                    <label htmlFor="" className="mr-4 font-bold">
                      Level:
                    </label>
                    <input type="number" min={1} max={100} defaultValue={100} />
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Ability:
                    </label>
                    <select id="abilities" className="p-2">
                      {abilities.map((ability: string) => (
                        <option
                          className="text-xl"
                          value={`${wordFormatter(ability)}`}
                        >
                          {`${wordFormatter(ability)}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Held Item:
                    </label>
                    <select id="heldItems" className="p-2">
                      {heldItems.map((item: string) => (
                        <option className="text-xl" value={`${item}`}>
                          {`${item}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Nature:
                    </label>
                    <select id="natures" className="p-2">
                      {natures.map((nature: string) => (
                        <option className="text-xl" value={`${nature}`}>
                          {`${nature}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <h5 className="text-center font-bold">Moves</h5>
                  {/* <MoveSelect props={...currentPokemon}/> */}
                  <div>
                    <label htmlFor="" className="font-bold">
                      Move 1:
                    </label>
                    <select id="move1" className="p-2">
                      {currentPokemon.moves.map(
                        (move: { move: { name: string } }) => (
                          <option
                            className="text-xl"
                            value={`${wordFormatter(move.move.name)}`}
                          >
                            {`${wordFormatter(move.move.name)}`}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Move 2:
                    </label>
                    <select id="move1" className="p-2">
                      {currentPokemon.moves.map(
                        (move: { move: { name: string } }) => (
                          <option
                            className="text-xl"
                            value={`${wordFormatter(move.move.name)}`}
                          >
                            {`${wordFormatter(move.move.name)}`}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Move 3:
                    </label>
                    <select id="move1" className="p-2">
                      {currentPokemon.moves.map(
                        (move: { move: { name: string } }) => (
                          <option
                            className="text-xl"
                            value={`${wordFormatter(move.move.name)}`}
                          >
                            {`${wordFormatter(move.move.name)}`}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Move 4:
                    </label>
                    <select id="move1" className="p-2">
                      {currentPokemon.moves.map(
                        (move: { move: { name: string } }) => (
                          <option
                            className="text-xl"
                            value={`${wordFormatter(move.move.name)}`}
                          >
                            {`${wordFormatter(move.move.name)}`}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>
              {/* 2nd column */}
              {/* <div className="flex flex-col">
                
              </div> */}
            </div>

            {/*  */}
            <table className="w-full table-auto text-center text-xl">
              <thead>
                <tr>
                  <th></th>
                  <th className="">BASE STATS</th>
                  <th className="">EVs</th>
                  <th className="">IVs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-300 bg-red-400">
                  <td className="font-bold">HP</td>
                  <td className="">100</td>
                  <td>
                    <input
                      className="bg-red-400 text-center"
                      type="number"
                      min={0}
                      max={252}
                      defaultValue={0}
                    />
                  </td>
                  <td>
                    <input
                      className="bg-red-400 text-center"
                      type="number"
                      min={0}
                      max={31}
                      defaultValue={31}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-300 bg-orange-400">
                  <td className="font-bold">ATK</td>
                  <td>100</td>
                  <td>
                    <input
                      className="bg-orange-400 text-center"
                      type="number"
                      min={0}
                      max={252}
                      defaultValue={0}
                    />
                  </td>
                  <td>
                    <input
                      className="bg-orange-400 text-center"
                      type="number"
                      min={0}
                      max={31}
                      defaultValue={31}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-300 bg-yellow-400">
                  <td className="font-bold">DEF</td>
                  <td>100</td>
                  <td>
                    <input
                      className="bg-yellow-400 text-center"
                      type="number"
                      min={0}
                      max={252}
                      defaultValue={0}
                    />
                  </td>
                  <td>
                    <input
                      className="bg-yellow-400 text-center"
                      type="number"
                      min={0}
                      max={31}
                      defaultValue={31}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-300 bg-blue-400">
                  <td className="font-bold">SP.ATK</td>
                  <td>100</td>
                  <td>
                    <input
                      className="bg-blue-400 text-center"
                      type="number"
                      min={0}
                      max={252}
                      defaultValue={0}
                    />
                  </td>
                  <td>
                    <input
                      className="bg-blue-400 text-center"
                      type="number"
                      min={0}
                      max={31}
                      defaultValue={31}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-300 bg-green-400">
                  <td className="font-bold">SP.DEF</td>
                  <td>100</td>
                  <td>
                    <input
                      className="bg-green-400 text-center"
                      type="number"
                      min={0}
                      max={252}
                      defaultValue={0}
                    />
                  </td>
                  <td>
                    <input
                      className="bg-green-400 text-center"
                      type="number"
                      min={0}
                      max={31}
                      defaultValue={31}
                    />
                  </td>
                </tr>
                <tr className="border-b border-neutral-300 bg-pink-400">
                  <td className="font-bold">SPE</td>
                  <td>100</td>
                  <td>
                    <input
                      className="bg-pink-400 text-center"
                      type="number"
                      min={0}
                      max={252}
                      defaultValue={0}
                    />
                  </td>
                  <td>
                    <input
                      className="bg-pink-400 text-center"
                      type="number"
                      min={0}
                      max={31}
                      defaultValue={31}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col items-center md:flex-row md:space-x-4 md:m-4">
              <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-green-600 p-4 text-center font-bold text-white">
                SAVE
              </div>
              <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-600 p-4 text-center font-bold text-white">
                DELETE
              </div>
            </div>
            {/*  */}
            {/* Team */}
            <div className="flex flex-row">
              {exampleUser.teams[0]?.pokemon.map((pokemon: Pokemon) => (
                <TeamPreviewView name={pokemon.name} imgUrl={pokemon.imgUrl} />
              ))}
            </div>
            {/* Back to Team View/ save buttons? */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
/*
<div className="flex w-full flex-row justify-center">
      
              <div className="flex flex-col">
                <TeamPreviewView
                  name={`SCEPTILE`}
                  imgUrl={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/992.png"
                  }
                />
                <div>
                  <label htmlFor="" className="mr-4 font-bold">
                    Level:
                  </label>
                  <input type="number" min={1} max={100} defaultValue={100} />
                </div>
                <div>
                  <label htmlFor="" className="font-bold">
                    Ability:
                  </label>
                  <select id="abilities" className="p-2">
                    {abilities.map((ability: string) => (
                      <option
                        className="text-xl"
                        value={`${wordFormatter(ability)}`}
                      >
                        {`${wordFormatter(ability)}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="" className="font-bold">
                    Held Item:
                  </label>
                  <select id="heldItems" className="p-2">
                    {heldItems.map((item: string) => (
                      <option className="text-xl" value={`${item}`}>
                        {`${item}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="" className="font-bold">
                    Nature:
                  </label>
                  <select id="natures" className="p-2">
                    {natures.map((nature: string) => (
                      <option className="text-xl" value={`${nature}`}>
                        {`${nature}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
         
              <div className="flex flex-col">
                <div className="text-center">
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">HP - </span>
                    100
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">ATK - </span>
                    100
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">DEF - </span>
                    100
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">SP-ATK - </span>
                    100
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">SP-DEF - </span>
                    100
                  </div>
                  <div className="m-2 text-xl text-neutral-900">
                    <span className="font-bold">SPE - </span>
                    100
                  </div>
                </div>
                <div>
                  <h5 className="text-center font-bold">Moves</h5>

                  <div>
                    <label htmlFor="" className="font-bold">
                      Move 1:
                    </label>
                    <select id="move1" className="p-2">
                      {currentPokemon.moves.map(
                        (move: { move: { name: string } }) => (
                          <option
                            className="text-xl"
                            value={`${wordFormatter(move.move.name)}`}
                          >
                            {`${wordFormatter(move.move.name)}`}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Move 2:
                    </label>
                    <select id="move1" className="p-2">
                      {currentPokemon.moves.map(
                        (move: { move: { name: string } }) => (
                          <option
                            className="text-xl"
                            value={`${wordFormatter(move.move.name)}`}
                          >
                            {`${wordFormatter(move.move.name)}`}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Move 3:
                    </label>
                    <select id="move1" className="p-2">
                      {currentPokemon.moves.map(
                        (move: { move: { name: string } }) => (
                          <option
                            className="text-xl"
                            value={`${wordFormatter(move.move.name)}`}
                          >
                            {`${wordFormatter(move.move.name)}`}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="" className="font-bold">
                      Move 4:
                    </label>
                    <select id="move1" className="p-2">
                      {currentPokemon.moves.map(
                        (move: { move: { name: string } }) => (
                          <option
                            className="text-xl"
                            value={`${wordFormatter(move.move.name)}`}
                          >
                            {`${wordFormatter(move.move.name)}`}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>
              </div>
  
              <div className="flex-col">
                <div className="text-center">
                  <h3 className="text-lg font-bold">Individual Values (IVs)</h3>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">HP - </span>
                    <input type="number" min={0} max={31} defaultValue={31} />
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">ATK - </span>
                    <input type="number" min={0} max={31} defaultValue={31} />
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">DEF - </span>
                    <input type="number" min={0} max={31} defaultValue={31} />
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">SP-ATK - </span>
                    <input type="number" min={0} max={31} defaultValue={31} />
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">SP-DEF - </span>
                    <input type="number" min={0} max={31} defaultValue={31} />
                  </div>
                  <div className="m-2 text-xl text-neutral-900">
                    <span className="font-bold">SPE - </span>
                    <input type="number" min={0} max={31} defaultValue={31} />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold">Effort Values (EVs)</h3>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">HP - </span>
                    <input type="number" min={0} max={252} defaultValue={0} />
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">ATK - </span>
                    <input type="number" min={0} max={252} defaultValue={0} />
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">DEF - </span>
                    <input type="number" min={0} max={252} defaultValue={0} />
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">SP-ATK - </span>
                    <input type="number" min={0} max={252} defaultValue={0} />
                  </div>
                  <div className="m-1 text-xl text-neutral-900">
                    <span className="font-bold">SP-DEF - </span>
                    <input type="number" min={0} max={252} defaultValue={0} />
                  </div>
                  <div className="m-2 text-xl text-neutral-900">
                    <span className="font-bold">SPE - </span>
                    <input type="number" min={0} max={252} defaultValue={0} />
                  </div>
                </div>
              </div>
            </div>


*/

import React, { useEffect, useState } from "react";
import Nav from "~/components/Nav";
import TeamPreviewView from "~/components/TeamPreviewView";
import Image from "next/image";
import PokemonType from "~/components/PokemonType";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Pokemon } from "@prisma/client";

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

export default function TeamEditPage() {
  // const [totalEVs, setTotalEVs] = useState(); TODO

  const [pokemonInfoArray, setPokemonInfoArray] = useState<any[]>([]);

  const { query } = useRouter();
  const pokemon = api.pokemon.getTeamPokemonById.useQuery(
    query.teamId as string,
  );
  const team = api.teams.getUserTeamById.useQuery(query.teamId as string);

  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

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

  const handleSetCurrentPokemon = (event: any) => {
    console.log(event)
    setCurrentPokemon(pokemon.data?.find((pokemonData) => pokemonData.pokemonId === event));
  };

  // useEffect(() => {
  //   console.log(teams.data);
  // }, [teams]);
  useEffect(() => {
    const getTeamPokemon = async (pokemon: Pokemon[]) => {
      const promises = pokemon.map(async (pokemonData) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`,
        );
        const data = await response.json();

        return {
          ...data,
          pokemonId: pokemonData.pokemonId
        };
      });

      const collectedData = await Promise.all(promises);
      setPokemonInfoArray([...collectedData]);
    };

    if (pokemon.data && !pokemon.isLoading) {
      getTeamPokemon(pokemon.data);
      setCurrentPokemon(pokemon.data[0]);
    }
  }, [pokemon.data]);

  useEffect(() => {
    if (pokemonInfoArray.length > 0 && currentPokemon !== undefined) {
      const abilitiesTemp: string[] = [];
      pokemonInfoArray
        .find((pokemon) => currentPokemon.name === pokemon.name)
        .abilities.forEach((ability: { ability: { name: string } }) => {
          if (!abilitiesTemp.includes(ability.ability.name)) {
            abilitiesTemp.push(ability.ability.name);
          }
        });
      setAbilities([...abilitiesTemp]);
    }
  }, [pokemonInfoArray, currentPokemon]);

  return (
    <>
      <section id="landing" className="bg-red-500">
        <Nav />
      </section>
      <div className="w-full py-2">
        <div className="mx-auto my-0 w-full max-w-6xl">
          {pokemonInfoArray.length > 0 && currentPokemon !== undefined ? (
            <div className="flex flex-col items-center">
              <div className="mb-2 text-center text-5xl font-bold text-neutral-900">
                {team.data?.teamName}
              </div>
              {/* PokeEdit */}

              <div className="flex w-full flex-row justify-center">
                {/* Row 1 */}
                <div className="flex flex-col items-center md:flex-row md:space-x-8">
                  <figure className="m-4 flex h-64 w-64 flex-col items-center justify-center rounded-lg border border-neutral-400">
                    <Image
                      src={
                        pokemonInfoArray.find(
                          (pokemon) => currentPokemon.name === pokemon.name,
                        ).sprites.front_default
                      }
                      className="px-4 pb-0"
                      width={196}
                      height={196}
                      alt=""
                    />
                    <span className="mb-1 text-center text-xl font-medium text-neutral-900">
                      {currentPokemon.name.toUpperCase() ?? ""}
                    </span>
                    <div className="mb-3 flex w-full justify-around">
                      <div className="flex flex-col items-center justify-center ">
                        {<div className="mb-1 text-sm font-bold">Type 1</div>}
                        <PokemonType
                          type={
                            pokemonInfoArray.find(
                              (pokemon) => currentPokemon.name === pokemon.name,
                            ).types[0].type.name
                          }
                        />
                      </div>

                      {pokemonInfoArray.find(
                        (pokemon) => currentPokemon.name === pokemon.name,
                      ).types.length === 2 && (
                        <div className="flex flex-col items-center justify-center">
                          {<div className="mb-1 text-sm font-bold">Type 2</div>}
                          <PokemonType
                            type={
                              pokemonInfoArray.find(
                                (pokemon) =>
                                  currentPokemon.name === pokemon.name,
                              ).types[1].type.name
                            }
                          />
                        </div>
                      )}
                    </div>
                  </figure>
                  <div className="flex flex-col items-center space-y-4">
                    <div>
                      <label htmlFor="" className="mr-4 font-bold">
                        Level:
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        defaultValue={currentPokemon.level ?? 100}
                      />
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
                      <select
                        id="heldItems"
                        className="p-2"
                        defaultValue={currentPokemon.item ?? "Life Orb"}
                      >
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
                      <select
                        id="natures"
                        className="p-2"
                        defaultValue={currentPokemon.nature ?? "Adamant"}
                      >
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
                    <div>
                      <label htmlFor="" className="font-bold">
                        Move 1:
                      </label>
                      <select
                        id="move1"
                        className="p-2"
                        defaultValue={
                          currentPokemon.move1 ??
                          pokemonInfoArray.find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          ).moves[0].move.name
                        }
                      >
                        {pokemonInfoArray
                          .find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          )
                          .moves.map((move: { move: { name: string } }) => (
                            <option
                              className="text-xl"
                              value={`${wordFormatter(move.move.name)}`}
                            >
                              {`${wordFormatter(move.move.name)}`}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="" className="font-bold">
                        Move 2:
                      </label>
                      <select
                        id="move1"
                        className="p-2"
                        defaultValue={
                          currentPokemon.move2 ??
                          pokemonInfoArray.find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          ).moves[0].move.name
                        }
                      >
                        {pokemonInfoArray
                          .find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          )
                          .moves.map((move: { move: { name: string } }) => (
                            <option
                              className="text-xl"
                              value={`${wordFormatter(move.move.name)}`}
                            >
                              {`${wordFormatter(move.move.name)}`}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="" className="font-bold">
                        Move 3:
                      </label>
                      <select
                        id="move1"
                        className="p-2"
                        defaultValue={
                          currentPokemon.move3 ??
                          pokemonInfoArray.find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          ).moves[0].move.name
                        }
                      >
                        {pokemonInfoArray
                          .find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          )
                          .moves.map((move: { move: { name: string } }) => (
                            <option
                              className="text-xl"
                              value={`${wordFormatter(move.move.name)}`}
                            >
                              {`${wordFormatter(move.move.name)}`}
                            </option>
                          ))}
                        {/* { <MoveSelect {...pokemonInfoArray
                          .find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          )
                          .moves}/>} */}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="" className="font-bold">
                        Move 4:
                      </label>
                      <select
                        id="move1"
                        className="p-2"
                        defaultValue={
                          currentPokemon.move4 ??
                          pokemonInfoArray.find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          ).moves[0].move.name
                        }
                      >
                        {pokemonInfoArray
                          .find(
                            (pokemon) => currentPokemon.name === pokemon.name,
                          )
                          .moves.map((move: { move: { name: string } }) => (
                            <option
                              className="text-xl"
                              value={`${wordFormatter(move.move.name)}`}
                            >
                              {`${wordFormatter(move.move.name)}`}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
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
                    <td className="">
                      {
                        pokemonInfoArray.find(
                          (pokemon) => currentPokemon.name === pokemon.name,
                        ).stats[0].base_stat
                      }
                    </td>
                    <td>
                      <input
                        className="bg-red-400 text-center"
                        type="number"
                        min={0}
                        max={252}
                        defaultValue={currentPokemon.hp_EV ?? 0}
                      />
                    </td>
                    <td>
                      <input
                        className="bg-red-400 text-center"
                        type="number"
                        min={0}
                        max={31}
                        defaultValue={currentPokemon.hp_IV ?? 31}
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-300 bg-orange-400">
                    <td className="font-bold">ATK</td>
                    <td>
                      {
                        pokemonInfoArray.find(
                          (pokemon) => currentPokemon.name === pokemon.name,
                        ).stats[1].base_stat
                      }
                    </td>
                    <td>
                      <input
                        className="bg-orange-400 text-center"
                        type="number"
                        min={0}
                        max={252}
                        defaultValue={currentPokemon.atk_EV ?? 0}
                      />
                    </td>
                    <td>
                      <input
                        className="bg-orange-400 text-center"
                        type="number"
                        min={0}
                        max={31}
                        defaultValue={currentPokemon.atk_IV ?? 31}
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-300 bg-yellow-400">
                    <td className="font-bold">DEF</td>
                    <td>
                      {
                        pokemonInfoArray.find(
                          (pokemon) => currentPokemon.name === pokemon.name,
                        ).stats[2].base_stat
                      }
                    </td>
                    <td>
                      <input
                        className="bg-yellow-400 text-center"
                        type="number"
                        min={0}
                        max={252}
                        defaultValue={currentPokemon.def_EV ?? 0}
                      />
                    </td>
                    <td>
                      <input
                        className="bg-yellow-400 text-center"
                        type="number"
                        min={0}
                        max={31}
                        defaultValue={currentPokemon.def_IV ?? 31}
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-300 bg-blue-400">
                    <td className="font-bold">SP.ATK</td>
                    <td>
                      {
                        pokemonInfoArray.find(
                          (pokemon) => currentPokemon.name === pokemon.name,
                        ).stats[3].base_stat
                      }
                    </td>
                    <td>
                      <input
                        className="bg-blue-400 text-center"
                        type="number"
                        min={0}
                        max={252}
                        defaultValue={currentPokemon.spatk_EV ?? 0}
                      />
                    </td>
                    <td>
                      <input
                        className="bg-blue-400 text-center"
                        type="number"
                        min={0}
                        max={31}
                        defaultValue={currentPokemon.spatk_IV ?? 31}
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-300 bg-green-400">
                    <td className="font-bold">SP.DEF</td>
                    <td>
                      {
                        pokemonInfoArray.find(
                          (pokemon) => currentPokemon.name === pokemon.name,
                        ).stats[4].base_stat
                      }
                    </td>
                    <td>
                      <input
                        className="bg-green-400 text-center"
                        type="number"
                        min={0}
                        max={252}
                        defaultValue={currentPokemon.spdef_EV ?? 0}
                      />
                    </td>
                    <td>
                      <input
                        className="bg-green-400 text-center"
                        type="number"
                        min={0}
                        max={31}
                        defaultValue={currentPokemon.spdef_IV ?? 31}
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-300 bg-pink-400">
                    <td className="font-bold">SPE</td>
                    <td>
                      {
                        pokemonInfoArray.find(
                          (pokemon) => currentPokemon.name === pokemon.name,
                        ).stats[5].base_stat
                      }
                    </td>
                    <td>
                      <input
                        className="bg-pink-400 text-center"
                        type="number"
                        min={0}
                        max={252}
                        defaultValue={currentPokemon.spe_EV ?? 0}
                      />
                    </td>
                    <td>
                      <input
                        className="bg-pink-400 text-center"
                        type="number"
                        min={0}
                        max={31}
                        defaultValue={currentPokemon.spe_IV ?? 31}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex flex-col items-center md:m-2 md:mt-3 md:flex-row md:space-x-4">
                <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-green-600 p-4 text-center font-bold text-white">
                  SAVE
                </div>
                <div className="flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-600 p-4 text-center font-bold text-white">
                  DELETE
                </div>
              </div>
              {/* Team */}
              <div className="flex flex-row">
                {pokemonInfoArray.map((pokemon) => (
                  <div onClick={() => handleSetCurrentPokemon(pokemon.pokemonId)}>
                    <TeamPreviewView
                      name={pokemon.name}
                      imgUrl={pokemon.sprites.front_default}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="m-4 text-3xl font-bold text-neutral-900">
                {team.data?.teamName}
              </div>
              <div className="mb-2 flex h-6 cursor-pointer items-center justify-center rounded-lg bg-red-500 p-4 text-center font-bold text-white">
                ADD POKEMON
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

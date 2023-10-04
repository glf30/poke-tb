import React, { useState } from "react";
import PokemonType from "./PokemonType";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface FilterByTypeProps {
  selectedTypes: string[];
  handleFilterSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isCheckboxDisabled: (type: string) => boolean;
}

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

const FilterByType: React.FC<FilterByTypeProps> = ({
  selectedTypes,
  handleFilterSelect,
  isCheckboxDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function openCloseFilter() {  
    setIsOpen(!isOpen);
  }

  return (
    <div className="mx-4 flex w-full max-w-sm md:max-w-3xl lg:max-w-5xl rounded-lg flex-col items-center bg-amber-100">
      <div className="flex flex-row justify-center items-center">
        <h1 className="m-2 text-4xl font-bold">Filter By Type</h1>
        <ChevronDownIcon width={40} className={`cursor-pointer  ml-1 mt-2 text-neutral-900 duration-200 ${
          isOpen ? 'rotate-180' : 'rotate-0'
        }` } onClick={openCloseFilter} />
      </div>
      { isOpen &&
      <div id="filter">
        <div className="my-2 flex w-full max-w-5xl flex-wrap items-center justify-center">
          {pokemonTypeNames.map((type) => (
            <div className="mx-2 my-2 flex justify-between">
              <input
                className="mx-3"
                type="checkbox"
                name="type-filter"
                value={type}
                checked={selectedTypes.includes(type)}
                onChange={handleFilterSelect}
                disabled={isCheckboxDisabled(type)}
              />
              <PokemonType type={type} />
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
};

export default FilterByType;

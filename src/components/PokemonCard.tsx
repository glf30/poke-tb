import React from "react";
import PokemonType from "./PokemonType";
import Image from "next/image";

type PokemonResult = {
  name: string;
  url: string;
  details?: any;
};

const PokemonCard = (props: PokemonResult) => {
  return (
    <div className="w-full max-w-xs mx-6 my-4 flex flex-col items-center rounded-lg border border-neutral-400 p-6">
      <figure className="flex h-52 w-52 items-center justify-center rounded-lg border border-neutral-400">
        <Image
          className=""
          src={`${props.details.sprites.front_default}`}
          alt=""
          width={196}
          height={196}
        />
      </figure>
      <div className="flex flex-col items-center">
        <div className="my-2 text-lg font-bold text-neutral-400">
          #{props.details.id}
        </div>
        <div className="text-2xl font-medium text-neutral-900">
          {props.name.toUpperCase()}
        </div>
      </div>
      <div className="my-3 flex w-full justify-around">
        <PokemonType type={props.details.types[0].type.name} />
        {props.details.types.length === 2 && (
          <PokemonType type={props.details.types[1].type.name} />
        )}
      </div>
    </div>
  );
};

export default PokemonCard;

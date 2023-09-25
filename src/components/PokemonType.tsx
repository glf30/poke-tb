import React from "react";

const PokemonType = (props: {type: string}) => {
    const typeColorSelect = {
        grass: 'bg-grass border-grass-border',
        water: 'bg-water border-water-border',
        electric: 'bg-electric border-electric-border',
        fire: 'bg-fire border-fire-border',
        psychic: 'bg-psychic border-psychic-border',
        bug: 'bg-bug border-bug-border',
        poison: 'bg-poison border-poison-border',
        normal: 'bg-normal border-normal-border',
        fighting: 'bg-fighting border-fighting-border',
        ground: 'bg-ground border-ground-border',
        rock: 'bg-rock border-rock-border',
        ghost: 'bg-ghost border-ghost-border',
        dark: 'bg-dark border-dark-border',
        steel: 'bg-steel border-steel-border',
        ice: 'bg-ice border-ice-border',
        fairy: 'bg-fairy border-fairy-border',
        dragon: 'bg-dragon border-dragon-border',
        flying: 'bg-flying border-flying-border',
    }
  return (
    <div className={`${typeColorSelect[props.type as keyof typeof typeColorSelect]} w-24 flex justify-center rounded-3xl border px-3 py-1 text-white`}>
      {props.type.toUpperCase()}
    </div>
  );
};

export default PokemonType;

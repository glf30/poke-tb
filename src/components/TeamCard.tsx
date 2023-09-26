import React from "react";

const TeamCard = (props: {name: string}) => {
  return (
    <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4">
      <h2 className="text-2xl font-bold">{props.name}</h2>
      {/* replace for trash can */}
      <span className="flex cursor-pointer text-sm text-red-500">DELETE</span>
    </div>
  );
};

export default TeamCard;

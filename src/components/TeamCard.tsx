import React from "react";
interface Props {
  onClick: (teamId: string) => void;
  name: string,
  teamId: string,
}

const TeamCard: React.FC<Props> = ({name, teamId, onClick}) => {
  return (
    <div className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4" onClick={() => onClick(teamId)}>
      <h2 className="text-2xl font-bold">{name}</h2>
      {/* replace for trash can */}
      <span className="flex cursor-pointer text-sm text-red-500">DELETE</span>
    </div>
  );
};

export default TeamCard;

import React, { Fragment, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

interface Props {
  onClick: (teamId: string) => void;
  name: string;
  teamId: string;
}

const TeamCard: React.FC<Props> = ({ name, teamId, onClick }) => {
  return (
    <div className="flex w-full items-center">
      <div
        className="m-1 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-neutral-400 bg-gradient-to-b from-neutral-100 to-neutral-300 p-4 duration-200 hover:opacity-70"
        onClick={() => onClick(teamId)}
      >
        <h2 className="text-2xl font-bold">{name}</h2>
      </div>
      <MyModal teamId={teamId} />
    </div>
  );
};

export default TeamCard;

export function MyModal(props: { teamId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { query } = useRouter();

  const teams = api.teams.getUserTeamsById.useQuery(query.userId as string);

  const deleteTeam = api.teams.deleteTeam.useMutation();

  const handleConfirm = () => {
    deleteTeam.mutate(props.teamId, { onSuccess: () => teams.refetch() });
    closeModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <TrashIcon
        className="h-6 w-6 cursor-pointer text-red-500 duration-200 hover:opacity-80"
        onClick={openModal}
      />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex items-center justify-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete this team?
                  </Dialog.Title>
                  {/* <div className="m-2 flex flex-col items-center justify-center">
                    <input
                      type="text"
                      className="rounded-lg bg-neutral-200 p-2 indent-2"
                      {...register("teamname", {
                        required: true,
                        maxLength: 20,
                      })}
                      maxLength={20}
                      autoComplete="off"
                    />
                    {errors.teamname && (
                      <span className="mt-2 text-xs text-red-800">
                        This field is required
                      </span>
                    )}
                  </div> */}

                  <div className="mt-4 flex items-center justify-center space-x-4">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                      onClick={handleConfirm}
                    >
                      YES
                    </button>
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-neutral-500 px-4 py-2 text-sm font-medium text-white hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      CANCEL
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

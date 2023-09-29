import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Nav = () => {
  const { user } = useUser();
  return (
    <nav className="mx-auto flex h-24 w-full max-w-6xl flex-row justify-between px-5 py-2">
      <div className="flex items-center">
        <figure className="flex h-14 w-14 items-center justify-center">
          <Image
            id="poke-logo"
            src="/assets/noun-pokeball-594337.svg"
            width={48}
            height={48}
            alt=""
          />
        </figure>
        <h1 className="text-2xl font-semibold text-neutral-900">PokeTB</h1>
      </div>
      <ul className="flex items-center justify-between">
        <li className="mx-3">
          <Link href="/" className="text-lg font-medium text-neutral-900 hover:text-white duration-200">
            Home
          </Link>
        </li>
        <li className="mx-3">
          <Link href="#" className="text-lg font-medium text-neutral-900 hover:text-white duration-200">
            Dark/Light Icon
          </Link>
        </li>
        {!user ? (
          <>
            <li className="mx-3">
              <Link
                href="sign-in"
                className="text-lg font-medium text-neutral-900 hover:text-white duration-200"
              >
                Sign In
              </Link>
            </li>
            <li className="mx-3 rounded-xl border border-white p-2 bg-white group cursor-pointer">
              <Link href="sign-up" className="text-lg font-medium text-neutral-900 group-hover:text-red-500 duration-200">
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mx-3 rounded-xl border border-white p-2 bg-white group cursor-pointer">
              <Link
                href={`/teams/${user.id}`}
                className="text-lg font-medium text-neutral-900 group-hover:text-red-500 duration-200"
              >
                {`Hi, ${user.firstName}`}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

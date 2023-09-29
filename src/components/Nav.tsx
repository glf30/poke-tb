import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs';

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
              <Link href="/" className="text-lg font-medium text-neutral-900">
                Home
              </Link>
            </li>
            <li className="mx-3">
              <Link href="#" className="text-lg font-medium text-neutral-900">
                Dark/Light Icon
              </Link>
            </li>
            { !user ? 
            <li className="mx-3">
              <Link href="#" className="text-lg font-medium text-neutral-900">
                Sign In
              </Link>
            </li> :
            <>
            <li className="mx-3 border border-white rounded-xl p-2">
              <Link href={`/teams/${user.id}`} className="text-lg font-medium text-white">
                {`Hi, ${user.firstName}`}
              </Link>
            </li>
            </>
            }
            {/* <li className="mx-3">
              <Link href="#" className="text-lg font-medium text-neutral-900">
                Sign Up
              </Link>
            </li> */}
          </ul>
        </nav>
  )
}

export default Nav
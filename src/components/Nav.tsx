import React from 'react'
import Image from 'next/image'

const Nav = () => {
  return (
    
    <nav className="mx-auto flex h-24 w-full max-w-6xl flex-row justify-between px-5 py-2">
          <div className="flex items-center">
            <figure className="flex h-14 w-14 items-center justify-center">
              <Image
                id="poke-logo"
                src="../assets/noun-pokeball-594337.svg"
                width={48}
                height={48}
                alt=""
              />
            </figure>
            <h1 className="text-2xl font-semibold text-neutral-900">PokeTB</h1>
          </div>
          <ul className="flex items-center justify-between">
            <li className="mx-3">
              <a href="#" className="text-lg font-medium text-neutral-900">
                Home
              </a>
            </li>
            <li className="mx-3">
              <a href="#" className="text-lg font-medium text-neutral-900">
                Dark/Light Icon
              </a>
            </li>
            <li className="mx-3">
              <a href="#" className="text-lg font-medium text-neutral-900">
                Log In
              </a>
            </li>
            <li className="mx-3">
              <a href="#" className="text-lg font-medium text-neutral-900">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
  )
}

export default Nav
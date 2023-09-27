import React from 'react'
import Image from 'next/image'

const TeamPreviewView = (props: {imgUrl: string, name: string}) => {
  return (
    <figure className="m-4 flex h-52 w-52 flex-col items-center justify-center rounded-lg border border-neutral-400">
    <Image
      className=""
      src={props.imgUrl}
      alt=""
      width={166}
      height={166}
    />
    <span className="text-center text-xl font-medium text-neutral-900">
      {props.name.toUpperCase()}
    </span>
  </figure>
  )
}

export default TeamPreviewView
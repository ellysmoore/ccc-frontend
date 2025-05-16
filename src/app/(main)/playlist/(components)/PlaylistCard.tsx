import { Playlist } from '@/types/playlistType'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const PlaylistCard = ({ playlist } : { playlist: Playlist }) => {
  return (
    <>
      <div className="relative group rounded-[12px] p-3 bg-transparent hover:bg-[#f0f0f0] transition-colors duration-300">
        <Link
          href={`/playlist/${playlist.id}`}
          className="flex flex-col"
        >
          <Image
            src={playlist.album_art}
            alt=""
            height={271}
            width={195}
            className="rounded-[12px] object-cover w-full"
          />

          <div className="mt-[10px] text-left text-[#0D0D12] text-f16 font-medium">
            {playlist.name.replace(/_/g, ' ')}
          </div>
        </Link>
      </div>
    </>
  )
}
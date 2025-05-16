'use client'

import React, { useEffect, useState } from 'react'
import { Loader } from '@/components/Loader';
import { Button } from '@/components/Button';
import { PLAYLIST_DATA } from '@/data/dummyData';
import { PlaylistCard } from './(components)/PlaylistCard';
import { Playlist } from '@/types/playlistType';
import { CreatePlaylistModal } from './(components)/CreatePlaylistModal';

const PlaylistIndexPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>(PLAYLIST_DATA); 
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState('');
  const [loading, setLoading] = useState(false);

  const loadPlaylist = async () => {
    // setLoading(true);
    const res = await fetch(`/api/play-list?page=${page}&limit=24`);
    const data = await res.json();
    setPlaylists(prev => [...prev, ...data.messages]);
    setLoading(false);
  };

  useEffect(() => {
    loadPlaylist();
  }, [page]);

  return (
    <>
      <div className="h-full overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full container mx-auto px-4 py-10">
        <h2 className='justify-between font-[500] border-b pb-[10px] border-gray-300 w-full flex items-center text-[#0D0D12] text-f18'>
          Playlist

          <Button 
            label='Create playlist'
            containerClassName="!w-fit"
            onClick={() => setOpenModal('create')}
          />
        </h2>

        <div 
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[14px] mb-6" 
          id="messages-container"
        >
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
            />
          ))}
        </div>

        {loading ? (
          <div className="w-full flex justify-center">
            <Loader size="medium" />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Button 
              label='Load More'
              containerClassName="!w-fit"
              onClick={() => setPage((p) => p + 1)}
            />
          </div>
        )}
      </div>

      <CreatePlaylistModal 
        isOpen={openModal == 'create'}
        onClose={() => setOpenModal('')}
      />
    </>
  );
}

export default PlaylistIndexPage
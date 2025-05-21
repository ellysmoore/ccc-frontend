'use client';

import React, { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/Button';
import { PLAYLIST_DATA } from '@/data/dummyData';
import { PlaylistCard } from './(components)/PlaylistCard';
import { Playlist } from '@/types/playlistType';
import { CreatePlaylistModal } from './(components)/CreatePlaylistModal';

const PlaylistIndexPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>(PLAYLIST_DATA);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadMorePlaylists = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/play-list?page=${page}&limit=24`);
      const data = await res.json();
      setPlaylists((prev) => [...prev, ...data.messages]);
    } catch (error) {
      console.error('Failed to load playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadMorePlaylists();
    }
  }, [page]);

  return (
    <>
      <div className="w-full h-full overflow-y-auto bg-[#F5F5F5] px-4 py-10 container mx-auto rounded-[10px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-6">
          <h2 className="text-[#0D0D12] text-lg font-medium">Playlist</h2>
          <Button 
            label="Create playlist" 
            containerClassName="!w-fit" 
            onClick={() => setModalOpen(true)} 
          />
        </div>

        {/* Playlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>

        {/* Load More / Loader */}
        <div className="w-full flex justify-center">
          {loading ? (
            <Loader size="medium" />
          ) : (
            <Button 
              label="Load More" 
              containerClassName="!w-fit" 
              onClick={() => setPage((prev) => prev + 1)} 
            />
          )}
        </div>
      </div>

      {/* Create Modal */}
      <CreatePlaylistModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
};

export default PlaylistIndexPage;

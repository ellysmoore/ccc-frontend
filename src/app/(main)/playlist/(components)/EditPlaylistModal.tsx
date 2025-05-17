'use client';

import { Modal } from '@/components';
import { Button } from '@/components/Button';
import { InputElement } from '@/components/forms/InputElement';
import { MessageToastCard } from '@/components/MessageToastCard';
import { MessageProps } from '@/types';
import { Playlist } from '@/types/playlistType';
import { useEffect, useState } from 'react';

export const EditPlaylistModal = ({ isOpen, playlist, onClose }: { isOpen: boolean, playlist: Playlist | null, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', description: '', });
  const [message, setMessage] = useState<MessageProps | null>({ type: '', text: '' });

  useEffect(() => {
    setFormData({
      name: playlist?.name || '', 
      description: playlist?.description || ''
    })
  }, [playlist])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: 'success', text: 'Example' });
    // TODO: Add form validation + submission logic
  };

  return (
    isOpen &&
      <Modal
        onClose={onClose}
        fullScreenMobile
        title='Edit Playlist'
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] md:px-6 pt-2 px-4 pb-4">
          {message?.text && (
            <MessageToastCard 
              text={message?.text}
              type={message?.type}
              handleClose={() => setMessage(null)}
            />
          )}

          <InputElement 
            value={formData?.name}
            name='name'
            type='text'
            onChangeEvent={handleChange}
            placeholder='Name'
            autoComplete="name"
            required
          />
          <InputElement 
            value={formData?.description}
            name='description'
            onChangeEvent={handleChange}
            placeholder='Description'
            autoComplete="description"
            required
          />

          <Button 
            type='submit'
            label='Edit Playlist'
          />
        </form>
      </Modal>
  );
}

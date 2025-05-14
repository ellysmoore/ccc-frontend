'use client';

import { useState } from 'react';
import { Modal } from './common';
import { InputElement } from './forms/InputElement';
import { Button } from './Button';
import { MessageProps } from '@/types';
import { MessageToastCard } from './MessageToastCard';

export const PasswordResetModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<MessageProps | null>({ type: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual reset logic
    setMessage({ type:'success', text:'Reset link has been sent (simulated).' });
  };

  return (
    isOpen &&
    <Modal
      onClose={onClose}
      fullScreenMobile
      title='RESET PASSWORD'
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
          value={email}
          name='email'
          type='email'
          onChangeEvent={(e) => setEmail(e.target.value)}
          placeholder='phillip@example.com'
          required
        />

        <Button 
          type='submit'
          label='Reset'
        />
      </form>
    </Modal>
  );
}

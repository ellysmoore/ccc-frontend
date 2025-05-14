'use client';

import { MessageProps } from '@/types';
import { Modal } from './common';
import { useState } from 'react';
import { InputElement } from './forms/InputElement';
import { Button } from './Button';
import { MessageToastCard } from './MessageToastCard';

export const CheckTicketModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState<MessageProps | null>({ type: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: 'success', text: 'Example' });
    // TODO: implement ticket validation logic
    console.log('Checking ticket with PIN:', pin);
  };

  return (
    isOpen &&
    <Modal
      onClose={onClose}
      fullScreenMobile
      title='CHECK TICKET'
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
          value={pin}
          name='pin'
          onChangeEvent={(e) => setPin(e.target.value)}
          placeholder='01234567'
          required
        />

        <Button 
          type='submit'
          label='CHECK TICKET'
        />
      </form>
    </Modal>
  );
}

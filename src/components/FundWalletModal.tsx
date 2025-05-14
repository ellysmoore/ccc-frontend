'use client';

import { MessageProps } from '@/types';
import { Modal } from './common';
import { useState } from 'react';
import { InputElement } from './forms/InputElement';
import { Button } from './Button';
import { MessageToastCard } from './MessageToastCard';

export const FundWalletModal = ({
  isOpen,
  onClose,
  userEmail
}: {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}) => {
  const [amount, setAmount] = useState('');
  const [ticketPin, setTicketPin] = useState('');
  const [message, setMessage] = useState<MessageProps | null>({ type: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userEmail)
    setMessage({ type: 'success', text: 'Example' });
    // TODO: Implement funding logic (e.g., API call)
  };

  return (
    isOpen &&
      <Modal
        onClose={onClose}
        fullScreenMobile
        title='FUND WALLET'
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
            value={amount}
            name='amount'
            type='number'
            onChangeEvent={(e) => setAmount(e.target.value)}
            placeholder='Amount'
            autoComplete="transaction-amount"
            label='Amount'
            required
          />

          <InputElement 
            value={ticketPin}
            name='ticketpin'
            type='text'
            onChangeEvent={(e) => setTicketPin(e.target.value)}
            placeholder='01234567'
            label='Ticket PIN'
            required
          />

          <div className="flex flex-col gap-3 pt-2">
            <Button 
              id='fund_with_ticket'
              type='submit'
              label='Fund With Ticket'
            />
            <Button 
              type='submit'
              label='Fund With Card'
              id="fund_with_card"
            />
            <Button 
              type='button'
              label='Other Payment Methods'
              id="others"
              onClick={() => alert('Other payment methods coming soon')}
            />
          </div>
        </form>
      </Modal>
  );
}

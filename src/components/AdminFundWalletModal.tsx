'use client';

// import { MessageProps } from '@/types';
import { Modal } from './common';
import { useState } from 'react';
import { InputElement } from './forms/InputElement';
import { Button } from './Button';
// import { MessageToastCard } from './MessageToastCard';
import { toast } from 'react-toastify';

export const AdminFundWalletModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState<MessageProps | null>({ type: '', text: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Wallet funded successfully')
    // TODO: Implement funding logic (e.g., API call)
    // "/admin/fund/${locals?.uid}"
    // setMessage({ type: 'success', text: 'Example' });
  };

  return (
    isOpen &&
      <Modal
        onClose={onClose}
        fullScreenMobile
        title='FUND WALLET'
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] md:px-6 pt-2 px-4 pb-4">
          {/* {message?.text && (
            <MessageToastCard 
              text={message?.text}
              type={message?.type}
              handleClose={() => setMessage(null)}
            />
          )} */}

          <InputElement 
            value={amount}
            name='amount'
            type='number'
            onChangeEvent={(e) => setAmount(e.target.value)}
            placeholder='Amount'
            maxLength={4}
            required
          />

          <InputElement 
            value={password}
            name='password'
            type='password'
            onChangeEvent={(e) => setPassword(e.target.value)}
            placeholder='Your password'
            autoComplete='nope'
            required
          />

          <div className="flex flex-col gap-3 pt-2">
            <Button 
              type='submit'
              label='Fund Wallet'
            />
          </div>
        </form>
      </Modal>
  );
}

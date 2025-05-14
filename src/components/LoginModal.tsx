'use client';

import { useState } from 'react';
import { MessageProps } from '@/types';
import { Modal } from './common';
import { InputElement } from './forms/InputElement';
import { Button } from './Button';
import { MessageToastCard } from './MessageToastCard';

export const LoginModal = ({ isOpen, onClose, handleResetPassword }: {
  isOpen: boolean;
  onClose: () => void;
  handleResetPassword: () => void
}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState<MessageProps | null>({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: 'success', text: 'Example' });
    // TODO: Add validation and login logic here
  };

  return (
    isOpen &&
    <>
      <Modal
        onClose={onClose}
        fullScreenMobile
        title='LOG IN'
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
            value={formData?.email}
            name='email'
            type='email'
            onChangeEvent={handleChange}
            placeholder='Email'
            autoComplete="email"
            required
          />

          <InputElement 
            value={formData?.password}
            name='password'
            type='password'
            onChangeEvent={handleChange}
            placeholder='Password'
            autoComplete="current-password"
            required
          />

          <div className="text-right">
            <button
              type="button"
              onClick={() => handleResetPassword()}
              className="w-fit text-sm text-orange-700 hover:underline"
            >
              Reset Password
            </button>
          </div>

          <Button 
            type='submit'
            label='Log In'
          />
        </form>
      </Modal>
    </>
  );
}

'use client';

import { MessageProps } from '@/types';
import { Modal } from './common';
import { InputElement } from './forms/InputElement';
import { Button } from './Button';
import { useState } from 'react';
import { MessageToastCard } from './MessageToastCard';

export const SignUpModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState<MessageProps | null>({ type: '', text: '' });

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
        title='Sign Up'
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
            placeholder='John Phillip'
            autoComplete="name"
            required
          />
          <InputElement 
            value={formData?.email}
            name='email'
            type='email'
            onChangeEvent={handleChange}
            placeholder='phillip@example.com"'
            autoComplete="email"
            required
          />

          <InputElement 
            value={formData?.password}
            name='password'
            type='password'
            onChangeEvent={handleChange}
            placeholder='Password'
            autoComplete="new-password"
            required
          />

          <InputElement 
            value={formData?.confirmPassword}
            name='confirmPassword'
            type='password'
            onChangeEvent={handleChange}
            placeholder='Confirm Password'
            autoComplete="new-password"
            required
          />

          <Button 
            type='submit'
            label='Sign Up'
          />
        </form>
      </Modal>
  );
}

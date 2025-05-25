'use client';

import { Modal } from './common';
import { Button } from './Button';

export const ConfirmModal = ({ title, body, isOpen, onClose, handleConfirm }: {
  isOpen: boolean;
  title: string;
  body: string;
  onClose: () => void;
  handleConfirm: () => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirm?.();
  };

  return (
    isOpen &&
    <>
      <Modal
        onClose={onClose}
        fullScreenMobile
        title={title}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] md:px-6 pt-2 px-4 pb-4">
          <div className='text-sm text-[#0D0D12] pb-3'>
            {body}
          </div>

          <div className='w-full flex items-center gap-[15px]'>
            <Button 
              type='button'
              label='Cancel'
              variant='outlined'
              onClick={onClose}
            />

            <Button 
              type='submit'
              label='Confirm'
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

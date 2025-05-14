'use client'

import { Button } from '@/components/Button';
import { InputElement } from '@/components/forms/InputElement';
import React, { useState } from 'react'

const ResetPasswordIndexPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle POST request here, e.g. via fetch or axios
    console.log({ password, confirmPassword });
  };

  return (
    <div className="flex w-full py-[15px] md:py-[20px] justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full md:border md:!min-h-0 !min-h-screen md:!w-[512px] !w-full' border-gray-200 max-w-md bg-white md:shadow-lg md:p-6 rounded-xl"
      >
        <div className={`w-full flex flex-col mb-5 gap-[4px]`}>
          <div className={`uppercase font-semibold text-base text-gray-800`}>
            Reset password
          </div>

          <div className="text-sm text-gray-500 w-full">
            Kindly enter and confirm your new password
          </div>
        </div>

        <div className="mb-4">
          <InputElement 
            value={password}
            name='new_password'
            type='password'
            label='New Password'
            onChangeEvent={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
          />
        </div>

        <div className="mb-6">
          <InputElement 
            value={confirmPassword}
            name='confirm_new_password'
            type='password'
            label='Confirm Password'
            onChangeEvent={(e) => setConfirmPassword(e.target.value)}
            placeholder='Enter Password'
            required
          />
        </div>

        <Button 
          label='Update Password'
          type='submit'
        />
      </form>
    </div>
  );
}

export default ResetPasswordIndexPage
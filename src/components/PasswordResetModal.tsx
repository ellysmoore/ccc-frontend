"use client";

import { useEffect, useState } from "react";
import { Modal } from "./common";
import { InputElement } from "./forms/InputElement";
import { Button } from "./Button";
import { MessageToastCard } from "./MessageToastCard";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "@/store/slices/auth";

export const PasswordResetModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Input validation
    if (!email.trim()) {
      setValidationError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    // Proceed if valid
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await dispatch(forgotPassword({ email }) as any);

    if (result.meta.requestStatus === "fulfilled") {
      // Optional: show success message or close modal
      onClose();
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    isOpen && (
      <Modal onClose={onClose} fullScreenMobile title="RESET PASSWORD">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[15px] md:px-6 pt-2 px-4 pb-4"
        >
          {error && <MessageToastCard text={error} type="failed" />}
          {validationError && (
            <MessageToastCard text={validationError} type="failed" />
          )}

          <InputElement
            value={email}
            name="email"
            type="email"
            onChangeEvent={(e) => setEmail(e.target.value)}
            placeholder="phillip@example.com"
            required
          />

          <Button
            type="submit"
            label={loading ? "Sending reset link..." : "Send reset link"}
            disabled={loading}
          />
        </form>
      </Modal>
    )
  );
};

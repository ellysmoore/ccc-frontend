"use client";

import { Modal } from "./common";
import { InputElement } from "./forms/InputElement";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { MessageToastCard } from "./MessageToastCard";
import { clearError, createUser } from "@/store/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const SignUpModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationMessage = validateForm();
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    const result = await dispatch(
      createUser({
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        name: formData.name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );

    if (
      result.meta.requestStatus === "fulfilled" &&
      result.payload?.is_active
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (error || validationError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
        setValidationError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, validationError, dispatch]);

  return (
    isOpen && (
      <Modal onClose={onClose} fullScreenMobile title="Sign Up">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[15px] md:px-6 pt-2 px-4 pb-4"
        >
          {error && <MessageToastCard text={error} type={"failed"} />}
          {validationError && (
            <MessageToastCard text={validationError} type={"failed"} />
          )}

          <InputElement
            value={formData?.name}
            name="name"
            type="text"
            onChangeEvent={handleChange}
            placeholder="John Phillip"
            autoComplete="name"
            required
          />

          <InputElement
            value={formData?.email}
            name="email"
            type="email"
            onChangeEvent={handleChange}
            placeholder="phillip@example.com"
            autoComplete="email"
            required
          />

          <InputElement
            value={formData?.password}
            name="password"
            type="password"
            onChangeEvent={handleChange}
            placeholder="Password"
            autoComplete="new-password"
            required
          />

          <InputElement
            value={formData?.confirmPassword}
            name="confirmPassword"
            type="password"
            onChangeEvent={handleChange}
            placeholder="Confirm Password"
            autoComplete="new-password"
            required
          />

          <Button
            type="submit"
            label={loading ? "Creating account..." : "Create account"}
            disabled={loading}
          />
        </form>
      </Modal>
    )
  );
};

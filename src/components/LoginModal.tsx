"use client";

import { useEffect, useState } from "react";
import { Modal } from "./common";
import { InputElement } from "./forms/InputElement";
import { Button } from "./Button";
import { MessageToastCard } from "./MessageToastCard";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser, logout } from "@/store/slices/auth";
import { RootState } from "@/store/store";

export const LoginModal = ({
  isOpen,
  onClose,
  handleResetPassword,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleResetPassword: () => void;
}) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      return "Email and password are required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationMsg = validateForm();
    if (validationMsg) {
      setValidationError(validationMsg);
      return;
    }

    const result = await dispatch(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loginUser({ email: formData.email, password: formData.password }) as any
    );

    if (
      result.meta.requestStatus === "fulfilled" &&
      result.payload?.is_active
    ) {
      onClose();
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (error || validationError) {
      const timer = setTimeout(() => {
        dispatch(clearError());
        setValidationError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, validationError, dispatch]);

  return (
    isOpen && (
      <Modal onClose={onClose} fullScreenMobile title="LOG IN">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[15px] md:px-6 pt-2 px-4 pb-4"
        >
          {error && <MessageToastCard text={error} type={"failed"} />}
          {validationError && <MessageToastCard text={validationError} type={"failed"} />}

          <InputElement
            value={formData.email}
            name="email"
            type="email"
            onChangeEvent={handleChange}
            placeholder="Email"
            autoComplete="email"
            required
          />

          <InputElement
            value={formData.password}
            name="password"
            type="password"
            onChangeEvent={handleChange}
            placeholder="Password"
            autoComplete="current-password"
            required
          />

          <div className="text-right">
            <button
              type="button"
              onClick={handleResetPassword}
              className="w-fit text-sm text-orange-700 hover:underline"
            >
              Reset Password
            </button>
          </div>

          <Button
            type="submit"
            label={loading ? "Logging in..." : "Log In"}
            disabled={loading}
          />
        </form>
      </Modal>
    )
  );
};

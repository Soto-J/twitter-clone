"use client";
import { useCallback, useState } from "react";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../Input";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onModalToggle = useCallback(() => {
    if (isLoading) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // todo: login
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        Don't have an account?{" "}
        <span
          onClick={onModalToggle}
          className="cursor-pointer text-white hover:underline"
        >
          Log in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title="Login to your account"
      actionLabel="Sign in"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

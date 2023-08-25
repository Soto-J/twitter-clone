"use client";
import { useCallback, useState } from "react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../Input";

const RegisterModal = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onModalToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal.onClose, loginModal.onOpen]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // todo: register
      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal.onClose]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Name"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Username"
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
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
        Already have an account?{" "}
        <span
          onClick={onModalToggle}
          className="cursor-pointer text-white hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      title="Create an account"
      actionLabel="Register"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;

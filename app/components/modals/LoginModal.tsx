"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import { log } from "console";
import Input from "../Input";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();

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
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      title="Login"
      actionLabel="Login"
      body={bodyContent}
    />
  );
};

export default LoginModal;

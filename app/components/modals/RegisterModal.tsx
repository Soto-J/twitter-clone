"use client";
import { useCallback, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast/headless";
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
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = async () => {
    setIsLoading(true);
    console.log(name, email, username, password);

    axios
      .post("/api/auth/register", {
        name,
        email,
        username,
        password,
      })
      .then(() => {
        toast.success("Account created successfully");
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <form className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        id="username"
        label="Username"
        disabled={isLoading}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
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

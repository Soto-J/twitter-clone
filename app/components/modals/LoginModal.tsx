"use client";
import { useCallback } from "react";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import toast from "react-hot-toast";
import Modal from "./Modal";
import Input from "../Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onModalToggle = useCallback(() => {
    if (isSubmitting) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [isSubmitting, loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      // todo: login
      loginModal.onClose();
    },
    [loginModal]
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        errors={errors}
        disabled={isSubmitting}
        register={register}
      />
      <Input
        register={register}
        id="password"
        label="Password"
        type="password"
        errors={errors}
        disabled={isSubmitting}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <p>
        Don&apos;t have an account?{" "}
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
      onSubmit={handleSubmit(onSubmit)}
      disabled={isSubmitting}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

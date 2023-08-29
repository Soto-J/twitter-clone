"use client";
import { useCallback } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../Input";
import { useForm, type FieldValues, SubmitHandler } from "react-hook-form";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      username: "",
      name: "",
      password: "",
    },
  });

  const onModalToggle = useCallback(() => {
    if (isSubmitting) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [isSubmitting, registerModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    toast.success("Account created successfully");
    return;
    axios
      .post("/api/auth/register", {
        ...data,
      })
      .then(() => {
        toast.success("Account created successfully");
        registerModal.onClose();
        reset();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const bodyContent = (
    <form className="flex flex-col gap-4">
      <Input
        register={register}
        id="email"
        label="Email"
        errors={errors}
        disabled={isSubmitting}
      />
      <Input
        register={register}
        id="name"
        label="Name"
        errors={errors}
        disabled={isSubmitting}
      />
      <Input
        register={register}
        id="username"
        label="Username"
        errors={errors}
        disabled={isSubmitting}
      />
      <Input
        register={register}
        id="password"
        label="Password"
        type="password"
        errors={errors}
        disabled={isSubmitting}
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
      onSubmit={handleSubmit(onSubmit)}
      disabled={isSubmitting}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;

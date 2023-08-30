"use client";
import { useCallback } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";

import axios from "axios";
import toast from "react-hot-toast";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../Input";

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

    axios
      .post("/api/auth/register", {
        ...data,
      })
      .then(() => {
        toast.success("Account created successfully");
        registerModal.onClose();
        reset();

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const bodyContent = (
    <form className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        errors={errors}
        register={register}
        disabled={isSubmitting}
        required
      />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        disabled={isSubmitting}
        required
      />
      <Input
        id="username"
        label="Username"
        register={register}
        errors={errors}
        disabled={isSubmitting}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        disabled={isSubmitting}
        required
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
          Log in
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

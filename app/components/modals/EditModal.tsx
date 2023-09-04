"use client";
import { useCallback } from "react";

import { useEditModal } from "@/app/hooks/useEditModal";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";

import Modal from "./Modal";
import Input from "../Input";
import toast from "react-hot-toast";

const EditModal = () => {
  const editModal = useEditModal();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      bio: "",
      username: "",
      email: "",
      profileImage: "",
      coverImage: "",
    },
  });

  const onEditClick: SubmitHandler<FieldValues> = useCallback(async (data) => {
    console.log(data);
    return;
    try {
      const response = await fetch("/api/edit", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast.success("Profile updated successfully");

      return reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isSubmitting}
        register={register}
        errors={errors}
        id="username"
        label="Username"
      />
      <Input
        disabled={isSubmitting}
        register={register}
        errors={errors}
        id="name"
        label="Name"
      />
      <Input
        disabled={isSubmitting}
        register={register}
        errors={errors}
        id="email"
        label="Email"
      />
      <Input
        disabled={isSubmitting}
        register={register}
        errors={errors}
        id="bio"
        label="Bio"
      />
    </div>
  );

  return (
    <Modal
      isOpen={editModal.isOpen}
      title="Edit profile"
      actionLabel="Submit"
      onClose={editModal.onClose}
      onSubmit={handleSubmit(onEditClick)}
      body={bodyContent}
    />
  );
};

export default EditModal;

"use client";
import { useCallback } from "react";

import { useEditModal } from "@/app/hooks/useEditModal";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";

import Modal from "./Modal";
import Input from "../Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const EditModal = () => {
  const router = useRouter();
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
      profileImage: "",
      coverImage: "",
    },
  });

  const onEditClick: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      try {
        const response = await axios.post("/api/edit", data);

        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }

        toast.success("Profile updated successfully");
        editModal.onClose();
        router.refresh();
        return reset();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [reset, toast, editModal, isSubmitting, handleSubmit, errors, register]
  );

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
        id="bio"
        label="Bio"
      />
      {/* <Input
        disabled={isSubmitting}
        register={register}
        errors={errors}
        id="profileImage"
        label="Profile Image"
      />
      <Input
        disabled={isSubmitting}
        register={register}
        errors={errors}
        id="coverImage"
        label="Cover Image"
      /> */}
    </div>
  );

  return (
    <Modal
      isOpen={editModal.isOpen}
      title="Edit profile"
      actionLabel="Submit"
      disabled={isSubmitting}
      onClose={editModal.onClose}
      onSubmit={handleSubmit(onEditClick)}
      body={bodyContent}
    />
  );
};

export default EditModal;

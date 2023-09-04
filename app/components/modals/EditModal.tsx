"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { useEditModal } from "@/app/hooks/useEditModal";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";

import ImageUpload from "../ImageUpload";
import Modal from "./Modal";
import Input from "../Input";
import toast from "react-hot-toast";

const EditModal = () => {
  const router = useRouter();
  const editModal = useEditModal();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
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

  const watchProfileImage = watch("profileImage");
  const watchCoverImage = watch("coverImage");

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
        id="bio"
        label="Bio"
        register={register}
        errors={errors}
        disabled={isSubmitting}
      />
      <ImageUpload
        id="profileImage"
        label="Upload Profile Image"
        register={register}
        errors={errors}
        disabled={isSubmitting}
        onChange={(value) => setValue("profileImage", value)}
        imageUpload={watchProfileImage}
      />
      <ImageUpload
        id="coverImage"
        label="Upload Cover Image"
        register={register}
        errors={errors}
        disabled={isSubmitting}
        onChange={(value) => setValue("coverImage", value)}
        imageUpload={watchCoverImage}
      />
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
      cancelButton
      resetForm={reset}
    />
  );
};

export default EditModal;

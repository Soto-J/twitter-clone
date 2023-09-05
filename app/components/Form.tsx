"use client";
import { useRouter } from "next/navigation";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";

import Button from "./Button";

interface FormProps {
  placeholder: string;
  postId?: string;
  isComment?: boolean;
  user: User | null;
}

const Form = ({ placeholder, postId, isComment, user }: FormProps) => {
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const router = useRouter();
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { body } = data;

      if (body.length === 0) {
        throw new Error("Please enter a message");
      }

      const response = await axios.post("/api/posts", { body });

      if (response.status !== 200) {
        throw new Error();
      }

      toast.success("Post created");
      reset();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="border-b border-neutral-800 px-5 py-2">
      <div className="py-8">
        <h1
          className="
            mb-4
            text-center
            text-2xl
            font-bold
            text-white
          "
        >
          Welcome to Twitter
        </h1>
        <div className="flex items-center justify-center gap-4">
          <Button label="Login" onClick={LoginModal.onOpen} />
          <Button secondary label="Register" onClick={registerModal.onOpen} />
        </div>
      </div>
    </div>
  );
};

export default Form;

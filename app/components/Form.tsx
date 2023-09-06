"use client";
import { useRouter } from "next/navigation";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";

import Button from "./Button";
import Avatar from "./Avatar";

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
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: { body: "" },
  });

  const watchBody = watch("body");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { body } = data;
 
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
      {user ? (
        <div className="flex gap-4">
          <div>
            <Avatar user={user} />
          </div>
          <div className="w-full">
            <textarea
              {...register("body")}
              disabled={isSubmitting}
              placeholder={placeholder}
              className="
                peer
                mt-3
                w-full
                resize-none
                bg-black
                text-[20px]
                text-xl
                text-white
                placeholder-neutral-500
                outline-none
                ring-0
                disabled:cursor-not-allowed
                disabled:opacity-80
              "
            />
            <hr
              className="
                h-[1px]
                w-full
                border-neutral-800
                opacity-0
                peer-focus:opacity-100
              "
            />
            <div className="mt-4 flex justify-end">
              <Button
                label="Tweet"
                disabled={isSubmitting || watchBody.length === 0}
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Form;

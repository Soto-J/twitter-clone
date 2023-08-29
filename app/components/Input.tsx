"use client";

import {
  UseFormRegister,
  type FieldValues,
  type FieldErrors,
} from "react-hook-form";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
}

const Input = ({
  register,
  id,
  label,
  errors,
  disabled,
  type = "text",
}: InputProps) => {
  return (
    <input
      {...register(id)}
      id={id}
      placeholder={id}
      disabled={disabled}
      type={type}
      className="
        w-full
        rounded-md
        border-2
        border-neutral-800
        bg-black
        p-4
        text-white
        outline-none
        transition
        focus:border-2
        focus:border-sky-500
        disabled:cursor-not-allowed
        disabled:bg-neutral-900
        disabled:opacity-70
      "
    />
  );
};

export default Input;

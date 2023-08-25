interface InputProps {
  placeholder: string;
  value?: string;
  disabled?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder,
  value,
  disabled,
  type,
  onChange,
}: InputProps) => {
  return (
    <input
      disabled={disabled}
      value={value}
      type={type}
      onChange={onChange}
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

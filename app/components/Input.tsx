interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  label,
  disabled,
  type = "text",
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      id={id}
      placeholder={id}
      disabled={disabled}
      type={type}
      value={value}
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

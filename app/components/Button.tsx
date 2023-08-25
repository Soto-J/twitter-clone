interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-full
        border-2
        font-semibold
        transition
        hover:opacity-80
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${fullWidth ? "w-full" : "max-w-fit"}
        ${secondary ? "border-black" : "border-sky-500"}
        ${secondary ? "bg-white" : "bg-sky-500"}
        ${secondary ? "text-black" : "text-white"}
        ${large ? "px-5" : "px-4"}
        ${large ? "py-3" : "py-2"}
        ${large ? "text-xl" : "text-base"}
        ${outline ? "bg-transparent" : ""}
        ${outline ? "border-white" : ""}
        ${outline ? "text-white" : ""}
      `}
    >
      {label}
    </button>
  );
};

export default Button;

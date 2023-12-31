"use client";
import { useCallback } from "react";
import { createPortal } from "react-dom";

import { FieldValues, UseFormReset } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";

import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  resetFormOnClose?: UseFormReset<FieldValues>;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  cancelButton?: boolean;
}

const Modal = ({
  isOpen,
  cancelButton,
  onClose,
  onSubmit,
  resetFormOnClose,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}: ModalProps) => {
  const handleClose = useCallback(() => {
    if (disabled) return;

    onClose();
    resetFormOnClose?.();
  }, [disabled, onClose, resetFormOnClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          overflow-y-auto
          overflow-x-hidden
          bg-neutral-800
          bg-opacity-70
          text-white
          outline-none
          focus:outline-none
        "
      >
        <div
          className="
            relative
            mx-auto
            my-6
            h-full
            w-full
            lg:h-auto
            lg:w-3/4
            lg:max-w-3xl
          "
        >
          {/* Content */}
          <div
            className="
              relative
              flex
              min-h-full
              w-full
              flex-col
              rounded-lg
              border-0
              bg-black
              shadow-lg
              outline-none
              focus:outline-none
              lg:h-auto
            "
          >
            {/* Header */}
            <div
              className="
              flex
              items-center
              justify-between
              rounded-t
              p-10
            "
            >
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                onClick={handleClose}
                className="
                  ml-auto 
                  border-0
                  p-1
                  text-white
                  transition
                  hover:opacity-70  
                "
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* BODY */}
            <div className="relative flex-auto p-10">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-10">
              <div className="flex gap-10">
                {cancelButton && (
                  <Button
                    large
                    secondary
                    fullWidth
                    label="Cancel"
                    onClick={handleClose}
                    disabled={disabled}
                  />
                )}
                <Button
                  large
                  secondary
                  fullWidth
                  label={actionLabel}
                  onClick={handleSubmit}
                  disabled={disabled}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body as HTMLElement
  );
};

export default Modal;

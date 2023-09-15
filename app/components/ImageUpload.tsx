import { useCallback } from "react";
import Image from "next/image";

import { useDropzone } from "react-dropzone";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface ImageUploadProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
  onChange: (value: any) => void;
  imageUpload: string;
}

const ImageUpload = ({
  id,
  label,
  register,
  errors,
  onChange,
  imageUpload,
  disabled,
}: ImageUploadProps) => {
  // Change the image to base64
  const onDropHandler = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        onChange(e.target.result);
      };

      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: onDropHandler,
    disabled,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className: `
          w-full
          p-4
          text-white
          text-center
          border-2
          border-dotted
          border-neutral-700
          rounded-md
          cursor-pointer
        `,
      })}
    >
      <input {...getInputProps()} />
      {imageUpload ? (
        <div className="flex items-center justify-center">
          <Image
            width={200}
            height={200}
            src={imageUpload}
            alt="Upload Image"
          />
        </div>
      ) : (
        <p>{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;

"use client";
import { useCallback } from "react";

import { useEditModal } from "@/app/hooks/useEditModal";
import Modal from "./Modal";

const EditModal = () => {
  const editModal = useEditModal();

  const onEditClick = useCallback(() => {}, []);
  return (
    <Modal
      isOpen={editModal.isOpen}
      title="Edit profile"
      actionLabel="Submit"
      onClose={editModal.onClose}
      onSubmit={() => {}}
    />
  );
};

export default EditModal;

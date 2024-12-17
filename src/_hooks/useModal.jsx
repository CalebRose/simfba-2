import { useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return { isModalOpen, handleOpenModal, handleCloseModal };
}

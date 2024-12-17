import React from "react";
import { Modal } from "../../_design/Modal";

export const SelectedTeamModal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} actions={actions}>
      {children}
    </Modal>
  );
};

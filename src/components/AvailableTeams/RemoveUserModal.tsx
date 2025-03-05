import { ReactNode } from "react";
import { Modal, ModalProps } from "../../_design/Modal";

// 🔑 Define Props Interface for Modal
export interface RemoveUserModalProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const RemoveUserModal: React.FC<RemoveUserModalProps> = ({
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

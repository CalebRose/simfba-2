import { ReactNode } from "react";
import { Modal, ModalProps } from "../../_design/Modal";

// 🔑 Define Props Interface for Modal
export interface SelectedTeamModalProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const SelectedTeamModal: React.FC<SelectedTeamModalProps> = ({
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

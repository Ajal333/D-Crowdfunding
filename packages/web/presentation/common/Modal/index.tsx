import {
  //   Button,
  Modal,
  ModalBody,
  ModalContent,
  //   ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  //   extraFooter: ReactElement;
}

const CustomModal = ({ title, closeModal, children }: Props) => {
  return (
    <Modal isOpen={true} onClose={() => closeModal(true)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => closeModal(false)}>
            Close
          </Button>
          {extraFooter}
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

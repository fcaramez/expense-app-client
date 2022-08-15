import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function ExpenseModal({
  isOpen,
  onClose,
  closeModal,
  deleteExpense,
  modalInfo,
}) {
  const navigate = useNavigate();
  return (
    <Modal key={modalInfo._id} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Name: {modalInfo.name}</ModalHeader>
        <ModalCloseButton onClick={() => closeModal()} />
        <ModalBody>
          <Text>Cost: {modalInfo.price} €</Text>
          <Text>Date: {modalInfo.date.slice(0, 10)}</Text>
          <Text>Type: {modalInfo.type}</Text>
          <Text>Receipt: </Text>
          <img style={{maxWidth: `400px`}} src={modalInfo.receipt} alt="receipt" />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme={"green"}
            mr={3}
            onClick={() => navigate(`/edit/${modalInfo._id}`)}
            alignContent={"center"}>
            Edit
          </Button>
          <Button
            colorScheme={"red"}
            backgroundColor={"red.500"}
            onClick={() => deleteExpense(modalInfo._id)}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

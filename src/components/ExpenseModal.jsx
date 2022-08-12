import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Button
} from "@chakra-ui/react";
export function ExpenseModal({ isOpen, onClose, closeModal, deleteExpense, modalInfo }) {
  return (
    <Modal key={modalInfo._id} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Name: {modalInfo.name}</ModalHeader>
        <ModalBody>
          <Text>Cost: {modalInfo.price} €</Text>
          <Text>Date: {modalInfo.date.slice(0, 10)}</Text>
          <Text>Type: {modalInfo.type}</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => closeModal()}
            alignContent={"center"}>
            Close
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

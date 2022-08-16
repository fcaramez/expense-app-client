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
  Image
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export function PostModal({
  isOpen,
  onClose,
  closeModal,
  deleteExpense,
  modalInfo,
}) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user._id;

  return (
    <Modal key={modalInfo._id} isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title: {modalInfo.title}</ModalHeader>
        <ModalCloseButton onClick={() => closeModal()} />
        <ModalBody>
          <h1>Content:</h1>
          <Text>{modalInfo.content}</Text>
          <Image objectFit={"cover"} src={modalInfo.image} alt="receipt" />
        </ModalBody>
        {userId === modalInfo.author._id ? (
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
        ) : (
          <ModalFooter>
            <Text>By: {modalInfo.author.username}</Text>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}

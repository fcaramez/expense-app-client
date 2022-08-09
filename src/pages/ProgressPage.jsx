import React from "react";
import apiService from "../service/api.service";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import {
  TableContainer,
  Table,
  Thead,
  Td,
  Tr,
  Th,
  Tbody,
  Heading,
  Text,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
} from "@chakra-ui/react";

function ProgressPage() {
  const api = new apiService();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const { onOpen, onClose } = useDisclosure();
  const [modalInfo, setModalInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const getModal = (el) => {
    setModalInfo(el);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getExpenses = async () => {
    const response = await api.getExpenses(user._id);
    setExpenses(response.data.expenses);
    console.log(response.data.expenses);
    setBudget(response.data.budget);
  };

  const deleteExpense = async (expenseId) => {
    try {
      await api.deleteExpense(user._id, expenseId);
      setIsOpen(false);
      getExpenses();
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <Stack spacing={5}>
      <Heading>Welcome, {user.username}!</Heading>
      <br />
      {budget !== null && (
        <Text fontSize={"xl"}>Your current budget is: {budget} €</Text>
      )}
      {expenses.length > 0 && (
        <>
          <Heading>Here's your 5 most recent expenses: </Heading>
          <br />
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              {expenses
                .filter((el, ix) => ix < 5)
                .map((el) => {
                  if (el.source === "expense")
  return (
    <Stack spacing={5}>
      <Heading>Welcome, {user.username}!</Heading>
      <br />
      {budget !== null && (
        <Text fontSize={"xl"}>Your current budget is: {budget} €</Text>
      )}
      {expenses.length > 0 && (
        <>
          <Heading>Here's your 5 most recent expenses: </Heading>
          <br />
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              {expenses
                .filter((el, ix) => ix < 5)
                .map((el) => {
                  if (el.source === "expense")
                    return (
                      <>
                        <Tbody key={el._id}>
                          <Tr>
                            <Td>{el.name}</Td>
                            <Td>
                              <Button
                                colorScheme={"teal"}
                                backgroundColor={"teal.500"}
                                onClick={() => getModal(el)}>
                                Details
                              </Button>
                            </Td>
                          </Tr>
                        </Tbody>
                      </>
                    );
                })
                .reverse()}
            </Table>
          </TableContainer>
          {modalInfo !== null && (
            <>
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
            </>
          )}
        </>
      )}
      {expenses.length > 0 && (
        <h1>Here's your current biggest source of income: </h1>
      )}
      <Appbar />
    </Stack>
  );
}

export default ProgressPage;

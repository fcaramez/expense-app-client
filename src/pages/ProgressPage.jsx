import { ExpenseModal } from "./../components/ExpenseModal";
import React from "react";
import expenseService from "../service/expense.service";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";

function ProgressPage() {
  const api = new expenseService();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const { onClose } = useDisclosure();
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
    <Stack spacing={7}>
      <br />
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
                                backgroundColor={"teal.300"}
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
              <ExpenseModal
                modalInfo={modalInfo}
                isOpen={isOpen}
                onClose={onClose}
                closeModal={closeModal}
                deleteExpense={deleteExpense}
              />
            </>
          )}
        </>
      )}
      {expenses.length > 0 && (
        <h1>Here's your current biggest source of income: </h1>
      )}
    </Stack>
  );
}

export default ProgressPage;

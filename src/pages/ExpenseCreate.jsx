import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  NumberInputField,
  NumberInput,
  Select,
} from "@chakra-ui/react";
import expenseService from "../service/expense.service";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ExpenseCreate() {
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [date, setDate] = useState(Date.now);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const api = new expenseService();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const createExpense = async () => {
    try {
      const body = { source, name, price, type, date };

      await api.createExpense(user._id, body);

      navigate("/progress");
    } catch (error) {
      setErrorMessage(error.respose.data.errorMessage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createExpense();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          width={"100%"}
          py={12}
          px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Create an Entry
            </Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <FormControl id="username" isRequired>
                  <FormLabel>Source</FormLabel>
                  <Select
                    placeholder="Select source"
                    onChange={(e) => setSource(e.target.value)}
                    value={source}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </Select>
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Ex: 08/2022 Salary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>€ Price</FormLabel>
                <InputGroup>
                  <NumberInput width={"100%"}>
                    <NumberInputField
                      placeholder="Price"
                      width={"100%"}
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                    />
                  </NumberInput>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <InputGroup>
                  <Select
                    placeholder="Select type"
                    onChange={(e) => setType(e.target.value)}
                    value={type}>
                    <option value="Household">Household</option>
                    <option value="Technology">Technology</option>
                    <option value="Work">Work</option>
                    <option value="Salary">Salary</option>
                    <option value="Allowance">Allowance</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Going Out">Going Out</option>
                    <option value="Other">Other</option>
                  </Select>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Date:</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    max={"today"}
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  colorScheme={"green"}
                  bg={"green.400"}
                  rounded={"full"}
                  _hover={{
                    bg: "green.500",
                  }}>
                  Create Entry
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

export default ExpenseCreate;

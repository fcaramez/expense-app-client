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
  Text,
} from "@chakra-ui/react";
import expenseService from "../service/expense.service";
import { useState, useContext, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditExpense() {
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [receipt, setReceipt] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate()
  const api = new expenseService();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
      .then((response) => {
        setReceipt(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const getOneExpense = async () => {
    const expense = await api.getOneExpense(id);
    setSource(expense.data.source);
    setName(expense.data.name);
    setPrice(expense.data.price);
    setType(expense.data.type);
    setDate(expense.data.date);
    setReceipt(expense.data.receipt);
  };

  useEffect(() => {
    getOneExpense();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = { source, name, price, type, date, receipt };
    try {
      await api.updateExpense(user._id, id, body);
      navigate("/progress")
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage);
    }
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
              Edit your entry
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
                  <NumberInput width={"100%"} value={price} >
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
                    _selected={date}
                    value={date}
                    max={"today"}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Receipt:</FormLabel>
                <input
                  type="file"
                  placeholder="Receipt"
                  onChange={(e) => handleFileUpload(e)}
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
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
              {errorMessage && <Text color={"red.400"}>{errorMessage}</Text>}
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

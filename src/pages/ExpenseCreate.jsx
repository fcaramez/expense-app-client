import React from "react";
import apiService from "../service/api.service";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  InputGroup,
  Button,
  Input,
  Stack,
  Heading,
  Text,
  NumberInputField,
  NumberInput,
  Select,
} from "@chakra-ui/react";
import Appbar from "../components/Appbar";

function ExpenseCreate() {
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [date, setDate] = useState(Date.now);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const api = new apiService();
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
    <>
      <Heading>Create an Expense</Heading>
      <br />
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Text>Source: </Text>
          <InputGroup>
            <Select
              placeholder="Select source"
              onChange={(e) => setSource(e.target.value)}
              value={source}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </InputGroup>
          <Text>Name: </Text>
          <InputGroup>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: 08/2022 Salary"
              size="sm"
            />
          </InputGroup>
          <Text>Price: </Text>
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
          <Text>Type: </Text>
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
          <Text>Date:</Text>
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
          <br />
          <InputGroup alignItems={"center"}>
            <Button
              width={"100%"}
              colorScheme="teal"
             type="submit">
              Create Expense
            </Button>
          </InputGroup>
          {errorMessage && <Text>{errorMessage}</Text>}
        </Stack>
      </form>
      <Appbar />
    </>
  );
}

export default ExpenseCreate;

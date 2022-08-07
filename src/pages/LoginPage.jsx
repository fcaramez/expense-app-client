import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import {
  InputRightElement,
  InputGroup,
  Button,
  Input,
  Stack,
  Heading,
  Text,
  Highlight,
} from "@chakra-ui/react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.data.errorMessage);
      });
  };

  return (
    <>
      <Heading textAlign={"center"}>Login</Heading>
      <br />

      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <InputGroup size="lg">
            <Input
              size="lg"
              pr="4.5rem"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup size="lg">
            <Input
              colorScheme="teal"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement colorScheme="teal" width="4.5rem">
              <Button
                colorScheme="teal"
                h="1.75rem"
                size="lg"
                onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errorMessage && <p>{errorMessage}</p>}

          <Button colorScheme="teal" type="submit">
            Signup
          </Button>
          <Text fontSize="lg">
            Don't have an account? Signup{" "}
            <Link to={"/signup"}>
              <Highlight
                query="Here!"
                styles={{
                  px: "1",
                  py: "1",
                  rounded: "half",
                  bg: "teal.400",
                  color: "white",
                }}>
                Here!
              </Highlight>
            </Link>
          </Text>
        </Stack>
      </form>
    </>
  );
}

export default LoginPage;

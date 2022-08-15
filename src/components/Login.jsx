import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export function Login({ showPassword, setShowPassword, openSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    console.log("Form Submitted");
    e.preventDefault();

    const body = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, body)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/feed");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.errorMessage);
      });
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
              Login
            </Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={8}>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Not registered yet?{" "}
                  <Link color={"green.400"}>
                    <Button w={"100%"} onClick={() => openSignup()}>
                      Sign up
                    </Button>
                  </Link>
                </Text>
                {errorMessage && (
                  <Text color={"red.400"} align={"center"}>
                    {errorMessage}
                  </Text>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

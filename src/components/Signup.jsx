import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";

export function SignUp({ openLogin, showPassword, setShowPassword }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [budget] = useState(0);
  const [expenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
      .then((response) => {
        setProfilePicture(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const signupUser = async () => {
    try {
      const body = {
        username,
        email,
        password,
        budget,
        expenses,
        profilePicture,
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, body);

      openLogin();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.errorMessage);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser();
    setUsername("");
    setEmail("");
    setProfilePicture("");
    setPassword("");
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
              Sign up
            </Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
              </HStack>
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
              <FormControl>
                <FormLabel>Profile Picture</FormLabel>
                <input
                  type="file"
                  placeholder="Profile Picture"
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
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link color={"green.400"}>
                    <Button w={"100%"} onClick={() => openLogin()}>
                      Login
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

import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import socialService from "../service/social.service";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function PostCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const api = new socialService();
  const { user } = useContext(AuthContext);

  const author = user._id;

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
      .then((response) => {
        setImage(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const createPost = async () => {
    try {
      const body = { title, content, image, author };

      await api.createPost(body);

      navigate("/feed");
    } catch (error) {
        console.log(error)
      //setErrorMessage(error.respose.data.errorMessage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
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
              Create a Post
            </Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <FormControl id="title" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Content"
                  size={"md"}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Picture:</FormLabel>
                <input
                  type="file"
                  placeholder="Picture"
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
                  Create Post
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

export default PostCreate;

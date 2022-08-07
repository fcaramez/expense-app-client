import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [budget] = useState(0);
  const [expenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  const signupUser = async () => {
    try {
      const body = {
        username,
        email,
        password,
        budget,
        expenses,
      };

      let createdUser = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        body
      );

      console.log(createdUser);

      navigate("/login");
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
    setPassword("");
  };

  return (
    <>
      <Heading textAlign={"center"}>Signup</Heading>
      <br />

      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <InputGroup size="lg">
            <Input
              size="lg"
              pr="4.5rem"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
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
            Already have an account? Login{" "}
            <Link to={"/login"}>
              <Button colorScheme="teal" size="sm">
                Here!
              </Button>
            </Link>
          </Text>
        </Stack>
      </form>
    </>
  );
}

export default SignupPage;

import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}>
            Save money with <br />
            <Text as={"span"} color={"green.400"}>
              your friends
            </Text>
          </Heading>
          {/* <Text color={"gray.500"}>
            Track your daily expenses, track your progress throught the months
            and make sure to connect with like-minds to share some extra
            knoweledge on how to save money.
          </Text> */}
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}>
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              _hover={{
                bg: "green.500",
              }}
              px={6}>
              <Link to="/auth">Get Started</Link>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

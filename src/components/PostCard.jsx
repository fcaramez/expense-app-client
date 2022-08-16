import React from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { PostModal } from "./PostModal";
import { useState } from "react";

export function PostCard({ card }) {
  //const [modalInfo, setModalInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { onClose } = useDisclosure();
  const modalInfo = card;
  const getModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Box
      position={"relative"}
      onClick={() => getModal()}
      maxW={"445px"}
      w={"full"}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}>
      <Box bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
        <Image
          src={card.image}
          alt={"image"}
          objectFit={"cover"}
          boxSize={"450px"}
        />
      </Box>
      <Stack>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}>
          Post
        </Text>
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {card.title}
        </Heading>
      </Stack>
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar src={`${card.author.profilePicture}`} alt={"Author"} />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>{card.author.username}</Text>
        </Stack>
      </Stack>
      {modalInfo !== null && (
        <>
          <PostModal
            modalInfo={modalInfo}
            isOpen={isOpen}
            onClose={onClose}
            closeModal={closeModal}
          />
        </>
      )}
    </Box>
  );
}

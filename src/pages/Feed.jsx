import { PostCard } from "./../components/PostCard";
import React from "react";
import socialService from "../service/social.service";
import { useState, useEffect } from "react";
import { IconButton, Center } from "@chakra-ui/react";
import { MdCreate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const api = new socialService();
  const navigate = useNavigate();

  const renderPosts = async () => {
    try {
      const response = await api.getPosts();
      setPosts(response.data);
      console.log(response.data)
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  useEffect(() => {
    renderPosts();
  }, []);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((el) => {
          return (
            <Center py={6} key={el._id}>
              <PostCard card={el} />
            </Center>
          );
        })}
      {/* <button style={{ top: "0", postition: "fixed" }}>
        <Icon as={MdCreate} style={{ top: "0", postition: "fixed" }} />
      </button> */}
      <IconButton
        colorScheme="green"
        aria-label="Add Post"
        size="lg"
        icon={<MdCreate />}
        right={"10"}
        bottom={"10"}
        rounded={"25px"}
        position={"fixed"}
        zIndex={"2"}
        width={"50px"}
        height={"50px"}
        onClick={() => navigate("/create-post")}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

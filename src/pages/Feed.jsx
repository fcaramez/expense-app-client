import React from "react";
import socialService from "../service/social.service";
import { useState, useEffect } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const api = new socialService();

  const renderPosts = async () => {
    try {
      const response = await api.getPosts();
      setPosts(response.data);
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
            <div key={el._id}>
              <h1>{el.title}</h1>
              <p>{el.content}</p>
              <p>Author: {el.author.username}</p>
            </div>
          );
        })}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

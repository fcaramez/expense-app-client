import axios from "axios";

class socialService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;

    this.api = axios.create({
      baseURL: this.baseUrl,
    });
  }

  getUsers = () => {
    return this.api.get("/api/users");
  };

  getUserProfile = (userId) => {
    return this.api.get(`/api/user/${userId}`);
  };

  getPosts = () => {
    return this.api.get(`/api/posts`);
  };

  createPost = (body) => {
    return this.api.post("/api/posts", body);
  };

  editPost = (postId, body) => {
    return this.api.put(`/api/post/${postId}`, body);
  };

  deletePost = (postId, apiKey) => {
    this.api.delete(`/api/${postId}/${apiKey}`);
  };

  followUser = (currentUser, userToFollow) => {
    return this.api.put(`/api/follow/${currentUser}/${userToFollow}`, {});
  };

  unfollowUser = (currentUser, userToUnfollow) => {
    return this.api.put(`/api/${currentUser}/${userToUnfollow}`, {});
  };
}

export default socialService;

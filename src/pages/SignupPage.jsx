import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="usernmae"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default SignupPage;

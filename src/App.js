import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import ProgressPage from "./pages/ProgressPage";
import ExpenseCreate from "./pages/ExpenseCreate";
import UserProfileCard from "./components/UserProfileCard";
import Appbar from "./components/Appbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path={"/login"}
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/progress"
          element={
            <IsPrivate>
              <ProgressPage />
            </IsPrivate>
          }
        />
        <Route
          path="/create-expense"
          element={
            <IsPrivate>
              <ExpenseCreate />
            </IsPrivate>
          }
        />
        <Route path="/" element={<UserProfileCard />} />
      </Routes>
      <Appbar />
    </div>
  );
}

export default App;

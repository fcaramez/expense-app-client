import { Routes, Route } from "react-router-dom";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import ProgressPage from "./pages/ProgressPage";
import ExpenseCreate from "./pages/ExpenseCreate";
import Auth from "./pages/AuthPage";
import { LandingPage } from "./pages/LandingPage";
import Feed from "./pages/Feed";
import ProfilePage from "./pages/ProfilePage";
import EditExpense from "./pages/EditExpense";
import NavBar from "./components/Navbar";
import PostCreate from "./pages/PostCreate";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <IsAnon>
              <LandingPage />
            </IsAnon>
          }
        />
        <Route
          path={"/auth"}
          element={
            <IsAnon>
              <Auth />
            </IsAnon>
          }
        />
        <Route
          path={"/edit/:id"}
          element={
            <IsPrivate>
              <EditExpense />
            </IsPrivate>
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
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/feed"
          element={
            <IsPrivate>
              <Feed />
            </IsPrivate>
          }
        />
        <Route
          path="/create-post"
          element={
            <IsPrivate>
              <PostCreate />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

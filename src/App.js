import { Routes, Route } from "react-router-dom";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import ProgressPage from "./pages/ProgressPage";
import ExpenseCreate from "./pages/ExpenseCreate";
import Auth from "./pages/AuthPage";
import { LandingPage } from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
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
      </Routes>
    </div>
  );
}

export default App;

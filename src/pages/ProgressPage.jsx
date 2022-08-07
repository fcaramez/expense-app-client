import React from "react";
import apiService from "../service/api.service";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";

function ProgressPage() {
  const api = new apiService();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);

  const { user } = useContext(AuthContext);

  const getExpenses = async () => {
    const response = await api.getExpenses(user._id);
    console.log(response);
    setExpenses(response.data.expenses);
    setBudget(response.data.budget);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <>
      <h1>Welcome, {user.username}!</h1>
      {budget !== null && <h1>Your current budget is: {budget}</h1>}
      {expenses.length > 0 && <h1>Here's your 5 most recent expenses: </h1>}
      {expenses.length > 0 && (
        <h1>Here's your current biggest source of income: </h1>
      )}
    </>
  );
}

export default ProgressPage;

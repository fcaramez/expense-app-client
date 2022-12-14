import axios from "axios";

class ExpenseService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
    this.api = axios.create({
      baseURL: this.baseUrl,
    });
  }

  getExpenses = (apiKey) => {
    return this.api.get(`/api/expenses/${apiKey}`);
  };

  getOneExpense = (expenseId) => {
    return this.api.get(`/api/expense/${expenseId}`);
  };
  createExpense = (apiKey, body) => {
    return this.api.post(`/api/expenses/${apiKey}`, body);
  };

  updateExpense = (apiKey, expenseId, body) => {
    return this.api.put(`/api/expense/${expenseId}/${apiKey}`, body);
  };

  deleteExpense = (apiKey, expenseId) => {
    return this.api.delete(`/api/expense/${expenseId}/${apiKey}`);
  };
}

export default ExpenseService;

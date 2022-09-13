import axios from "axios";
const BASE_URL = "https://rn-tracker-app-4d718-default-rtdb.firebaseio.com";

export const storeExpenseDB = async (exopenseData) => {
  const { data } = await axios.post(`${BASE_URL}/expenses.json`, exopenseData);
  const id = data.name;
  return await id;
};

export const fetchExpensesDB = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/expenses.json`);

    const expenses = [];

    for (const kye in data) {
      const expenseObj = {
        id: kye,
        amount: data[kye].amount,
        date: new Date(data[kye].date),
        description: data[kye].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    console.log(error);
  }
};

export const updateExpenseDB = (id, expenseData) => {
  return axios.put(`${BASE_URL}/expenses/${id}.json`, expenseData);
};
export const deleteExpenseDB = (id) => {
  return axios.delete(`${BASE_URL}/expenses/${id}.json`);
};

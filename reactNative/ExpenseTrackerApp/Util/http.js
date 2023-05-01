import axios from 'axios'

const URL =
  'https://react-native-course-ac08d-default-rtdb.europe-west1.firebasedatabase.app'

export async function storeExpense(expenseData) {
  const res = await axios.post(URL + '/expenses.json', expenseData)
  const id = res.data.name
  return id
}

export async function fetchExpenses() {
  const res = await axios.get(URL + '/expenses.json')
  const data = Object.entries(res.data).map((entry) => ({
    id: entry[0],
    ...entry[1],
    date: new Date(entry[1].date),
  }))

  return data
}

export function updateExpenseDB(id, expenseData) {
  return axios.put(URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpenseDB(id) {
  return axios.delete(URL + `/expenses/${id}.json`)
}

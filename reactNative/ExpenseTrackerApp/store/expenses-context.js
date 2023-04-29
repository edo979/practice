import { createContext, useReducer } from 'react'

const EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoe',
    amount: 59.99,
    date: new Date('2023-04-25'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-04-26'),
  },
  {
    id: 'e3',
    description: 'Bannanas',
    amount: 9.99,
    date: new Date('2021-12-02'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 19.99,
    date: new Date('2022-02-17'),
  },
  {
    id: 'e5',
    description: 'A book',
    amount: 19.54,
    date: new Date('2022-02-22'),
  },
  {
    id: 'e6',
    description: 'A pair of shoe',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e7',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-01'),
  },
  {
    id: 'e8',
    description: 'Bannanas',
    amount: 9.99,
    date: new Date('2021-12-02'),
  },
  {
    id: 'e9',
    description: 'A book',
    amount: 19.99,
    date: new Date('2022-02-17'),
  },
  {
    id: 'e10',
    description: 'A book',
    amount: 19.54,
    date: new Date('2022-02-22'),
  },
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString()
      return [{ ...action.payload, id }, ...state]

    case 'UPDATE':
      return state.filter((expense) => {
        if (expense.id !== action.payload.id) return expense

        return { ...expense, ...action.payload.data }
      })

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, EXPENSES)

  function addExpense(expensesData) {
    dispatch({ type: 'ADD', payload: expensesData })
  }
  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }
  function updateExpense(id, expensesData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expensesData } })
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  }
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider

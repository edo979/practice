import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]

    case 'SET':
      const expenses = action.payload.sort((a, b) => (a.date > b.date ? -1 : 1))
      return expenses

    case 'UPDATE':
      return state.map((expense) => {
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
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

  function addExpense(expensesData) {
    dispatch({ type: 'ADD', payload: expensesData })
  }
  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses })
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
    setExpenses,
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

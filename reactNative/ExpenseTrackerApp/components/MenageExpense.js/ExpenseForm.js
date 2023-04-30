import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import Button from '../ui/Button'
import { getformatedDate } from '../../Util/date'
import { GlobalStyles } from '../../constants/style'

const ExpenseForm = ({ defaultValues, submitBtnLabel, onCancel, onSubmit }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() ?? '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getformatedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues?.description ?? '',
      isValid: true,
    },
  })

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curr) => ({
      ...curr,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }))
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curr) => ({
        amount: { value: curr.amount.value, isValid: amountIsValid },
        date: { value: curr.date.value, isValid: dateIsValid },
        description: {
          value: curr.description.value,
          isValid: descriptionIsValid,
        },
      }))
      return
    }

    onSubmit(expenseData)
  }

  const isFormDataInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Your Expense</Text>
      <View style={styles.flexRow}>
        <View style={styles.flex1}>
          <Input
            invalid={!inputs.amount.isValid}
            label="Amount"
            textInputConfig={{
              keyboardType: 'numeric',
              onChangeText: (value) => inputChangeHandler('amount', value),
              value: inputs.amount.value,
            }}
          />
          {!inputs.amount.isValid && (
            <Text style={styles.errorText}>Format is wrong</Text>
          )}
        </View>
        <Input
          invalid={!inputs.date.isValid}
          label="Date"
          style={styles.flex1}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler('date', value),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputChangeHandler('description', value),
          value: inputs.description.value,
        }}
      />
      {isFormDataInvalid && (
        <Text style={styles.errorText}>Form data Error!</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitBtnLabel}
        </Button>
      </View>
    </View>
  )
}
export default ExpenseForm
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  container: {
    marginTop: 80,
  },
  formTitle: {
    marginVertical: 24,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})

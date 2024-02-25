import React from 'react'

function FormInvalidInputMsg({ error }: { error?: string }) {
  return error ? <small className="text-danger">{error}</small> : null
}

export default FormInvalidInputMsg

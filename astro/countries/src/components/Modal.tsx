import { useState } from 'react'

type ModalProps = {
  isShow: boolean
  setHidden: () => void
}

export default function Modal({ isShow, setHidden }: ModalProps) {
  if (!isShow) return null

  return (
    <div className="absolute inset-0 bg-slate-500">
      <button onClick={setHidden}>X</button>
      Modal
    </div>
  )
}

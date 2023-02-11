import spinnerImg from '../assets/spinner.gif'

export default function Spinner() {
  return (
    <span className="bi">
      <img src={spinnerImg} alt="loading" />
    </span>
  )
}

import {
  decrement,
  increment,
  incrementAsync,
  selectCount,
  selectStatus,
} from '../../../store/counterSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'

const Counter = () => {
  const count = useAppSelector(selectCount)
  const fetchStatus = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>Counter app with Reduxjs and TypeScript</h1>

      <p>{count}</p>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <br />

      <button onClick={() => dispatch(incrementAsync(3))}>
        {fetchStatus === 'loading' ? 'Loading ...' : 'Asyn Increment by amount'}
      </button>
      {fetchStatus === 'failed' && <p>Error While Fetching</p>}
    </div>
  )
}
export default Counter

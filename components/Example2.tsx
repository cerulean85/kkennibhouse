'use client'
import Link from 'next/link';
import ExampleComponent from '@/components/Example';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { increment, decrement, incrementByAmount } from './counterSlice';
import { setOne, setTwo } from './dooriSlice';

export default function Example2Component() {
  const dispatch: AppDispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  const doori = useSelector((state: RootState) => state.doori.value)
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>

      <h1>Doori: {doori}</h1>
      <button onClick={() => dispatch(setOne())}>To One</button>
      <button onClick={() => dispatch(setTwo())}>To Two</button>

      {/* <div>
        <Link href="about">
          <button>Go 2 About Page!</button>
        </Link>
      </div>
      <div>
        <ExampleComponent></ExampleComponent>
      </div> */}
    </div>
  );
}

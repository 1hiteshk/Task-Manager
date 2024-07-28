'use client';
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { increment,decrement,incrementByAmount } from "./counterSlice"; 

const CounterComponent = () => {
    const count = useSelector((state:RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => dispatch(incrementByAmount(5))}
            >
              Increment by 5
            </button>
          </div>
        </div>
      )
};

export default CounterComponent;
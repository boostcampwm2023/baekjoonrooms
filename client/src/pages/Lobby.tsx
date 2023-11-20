import { useState } from 'react';

export default function Lobby() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1 className="bg-red-50 text-2xl font-bold">Lobby</h1>
      <h2>{count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        test
      </button>
    </>
  );
}

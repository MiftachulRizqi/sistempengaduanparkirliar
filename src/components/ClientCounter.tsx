"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="mt-4">
      <h4>Counter: {count}</h4>
      <button className="btn btn-danger" onClick={() => setCount(count + 1)}>
        Tambah
      </button>
    </div>
  );
}

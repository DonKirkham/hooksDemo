import * as React from 'react';

// Example presentation snippet. Edit/IntelliSense/lint work here, but this file
// is never picked up by the SPFx build because it lives outside src/.
export const Counter: React.FC<{ start?: number }> = ({ start = 0 }) => {
  const [count, setCount] = React.useState(start);

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  );
};

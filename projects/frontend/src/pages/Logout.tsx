import React, { FC, useEffect } from 'react';

const Logout: FC = () => {
  useEffect(() => {
    fetch('/api/logout', { method: 'POST' });
  }, []);

  // TODO css

  return (
    <>
      <h1>Bye then</h1>

      <a href="/">Regret</a>
    </>
  );
};

export default Logout;

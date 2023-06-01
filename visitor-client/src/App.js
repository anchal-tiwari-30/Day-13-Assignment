// App.js

import React, { useEffect, useState } from 'react';

function App() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    fetchVisitorCount();
  }, []);

  const fetchVisitorCount = () => {
    fetch('http://localhost:5000/api/visitorCount')
      .then((response) => response.json())
      .then((data) => setVisitorCount(data.count))
      .catch((error) => console.error('Failed to fetch visitor count:', error));
  };

  const incrementVisitorCount = () => {
    fetch('http://localhost:5000/api/incrementVisitorCount', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => setVisitorCount(data.count))
      .catch((error) => console.error('Failed to increment visitor count:', error));
  };

  return (
    <div className="App">
      <h1>Visitor Count: {visitorCount}</h1>
      <button onClick={incrementVisitorCount}>Increment Count</button>
    </div>
  );
}

export default App;

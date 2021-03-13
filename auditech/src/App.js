import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ nests, setNests ] = useState([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3000/events');
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        setNests((nests) => nests.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, nests]);

  return (
    <table className="stats-table">
      <thead>
        <h1>Pull requests dashboard</h1>
        <tr>
          <th>TIME STAMP</th>
          <th>PR URL</th>
          <th>SNAPSHOT</th>
        </tr>
      </thead>
      <tbody>
        {
          nests.map((nest, i) =>
            <tr key={i}>
              <td>{nest.timeStamp}</td>
              <td>{nest.PrURL}</td>
              <td>{nest.SnapShot}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}
export default App
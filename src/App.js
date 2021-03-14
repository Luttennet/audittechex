import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './App.css';

function App() {
  const [ nests, setNests ] = useState([]);

  const getPR = async function () {
    const request = axios.create({
      baseURL: 'https://auditechex.herokuapp.com/pullrequests'
  })
    const tempResult = await request.get()
    const results = tempResult.data
    return results
  }
  
  useEffect(() => {
    async function fetchMyAPI() {
      let mounted = true;
      await getPR()
        .then(pr => {
          if(mounted) {
            setNests(pr)
          }
        })
      return () => mounted = false;
    }
    fetchMyAPI()
  }, [])

  return (
    <table className="stats-table">
      <thead>
        <h1>Pull requests dashboard</h1>
        <tr>
          <th>pullrequest URL</th>
          <th>PR ID</th>
          <th>created time</th>
          <th>screenshot</th>
        </tr>
      </thead>
      <tbody>
        {
          nests.map((nest, i) =>
            <tr key={i}>
              <th>{nest[0].pr_url}</th>
              <th>{nest[0].id}</th>
              <th>{nest[0].created_time}</th>
              <th> <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" alt = "screenshot"/></th>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}
export default App
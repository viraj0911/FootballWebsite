import React, { useState } from "react";
import { database } from "./firebase";

const UserForm = () => {
  const [email, setEmail] = useState("");
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    database.ref("users").push({
      email: email,
      favoriteTeam: favoriteTeam
    });
    setEmail("");
    setFavoriteTeam("");
  };

  const handleResultClick = () => {
    database
      .ref("users")
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        const teams = {};
        for (const key in data) {
          const team = data[key].favoriteTeam;
          if (team) { // only add to count if team is not empty
            if (team in teams) {
              teams[team] += 1;
            } else {
              teams[team] = 1;
            }
          }
        }
        const sortedResults = Object.entries(teams).sort((a, b) => b[1] - a[1]);
        setResults(sortedResults);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: 'white', textDecorationLine: 'underline', }}>Enter Your Favourite Team</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ color: 'white' }}>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br /><br />
        <label style={{ color: 'white' }}>
          Favorite Team :
          <input
            type="text"
            value={favoriteTeam}
            onChange={(e) => setFavoriteTeam(e.target.value)}
          />
        </label>
        <br /><br />
        <button type="submit" style={{marginRight: '10px'}} >Submit</button>
        <button onClick={handleResultClick}>Result</button>
        {results.length > 0 && (
          <div>
            <br />
            <h2 style={{ color: 'white', textDecorationLine: 'underline', }} >Results</h2>
            <br />
            {results.map(([team, count]) => (
              <p key={team} style={{ color: 'white' }} > {`${team}: ${count}`}</p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;

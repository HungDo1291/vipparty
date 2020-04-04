import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect, createLocalVideoTrack } from 'twilio-video'
var accessToken = require('twilio').jwt.AccessToken;
const accountSid = "AC8e3ad87b2b2f267fa46b49d4e8c05bc6";
const authToken = "1328e0b9effc43bf3fa5e63ed03514fe"
const client = require('twilio')(accountSid, authToken)

function App() {
  var [name, setName] = useState({})

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
  }

  const accountSid = "AC8e3ad87b2b2f267fa46b49d4e8c05bc6";
  const apiKey = "SKd9d5c9349104027eb3c74e8b335eab75";
  const apiSecret = "k3Rlor1aPphRAWxNJeBlxgqO1r7QPLAx";

  return (
    <div className="App">
      <input type="name" placeholder="name" value={name} onChange={e => setName(e.target.value)} >
      </input>
      <button onClick={handleSubmit}>Join class</button>
      <button onClick={searchRooms()}>Find class</button>
      <div id="local-media">

      </div>
    </div>
  );
}

export default App;

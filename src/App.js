import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Video, { connect, createLocalVideoTrack } from 'twilio-video'
import { AccessToken } from 'twilio';
var accessToken = require('twilio').jwt.AccessToken;

function App() {
  var [name, setName] = useState({})

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("changed name to " + name)
    const tokenKey = new accessToken(accountSid, apiKey, apiSecret);
    tokenKey.addGrant(videoGrant)
    tokenKey.identity = identity
    var token = tokenKey.toJwt();
    console.log(tokenKey.toJwt())
    createVideo()
    connectVideo(token)
  }

  //create access token for user
  const VideoGrant = accessToken.VideoGrant;

  const accountSid = "AC8e3ad87b2b2f267fa46b49d4e8c05bc6";
  const apiKey = "SKd9d5c9349104027eb3c74e8b335eab75";
  const apiSecret = "k3Rlor1aPphRAWxNJeBlxgqO1r7QPLAx";

  const identity = name

  const videoGrant = new VideoGrant({
    room: "example-room"
  })

  function createVideo() {
    createLocalVideoTrack().then(track => {
      const localMediaContainer = document.getElementById('local-media');
      localMediaContainer.appendChild(track.attach())
    })
  }
  
  function connectVideo(token) {
    connect(token, { name: "example-class"}).then(room => {
      console.log("User has joined existing class " + room.sid)
    })
  }

  return (
    <div className="App">
      <input type="name" placeholder="name" value={name} onChange={e => setName(e.target.value)} >
      </input>
      <button onClick={handleSubmit}>Join class</button>
      <div id="local-media">

      </div>
    </div>
  );
}

export default App;

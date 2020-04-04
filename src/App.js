import React from 'react';
import logo from './logo.svg';
import './App.css';
import Video, { connect, createLocalVideoTrack } from 'twilio-video'
var accessToken = require('twilio-video')

function App() {
  var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzc3ZDJkYTQ0NDJiYmI0NmIxNDRlY2NhYjVjMjE2Mjg4LTE1ODYwMjQyODQiLCJpc3MiOiJTSzc3ZDJkYTQ0NDJiYmI0NmIxNDRlY2NhYjVjMjE2Mjg4Iiwic3ViIjoiQUM4ZTNhZDg3YjJiMmYyNjdmYTQ2YjQ5ZDRlOGMwNWJjNiIsImV4cCI6MTU4NjAyNzg4NCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiaGkiLCJ2aWRlbyI6eyJyb29tIjoiZXhhbXBsZS1jbGFzcyJ9fX0.I97_affnmAKM7ijVEWG-1_WBloHmtVZjXBLVw8FHcjg"

  createLocalVideoTrack().then(track => {
    const localMediaContainer = document.getElementById('local-media');
    localMediaContainer.appendChild(track.attach())
  })
  
  connect(token, { name: "example-class"}).then(room => {
    console.log("User has joined existing class " + room.sid)
  })

  Video.connect(token, { name: "example-class" }).then(room => {
    console.log('User has connected to the room with the name of ' + room.name)
  })


  return (
    <div className="App">
      <div id="local-media">
        
      </div>
    </div>
  );
}

export default App;

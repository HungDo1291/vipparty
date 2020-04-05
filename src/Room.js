import React, { useState, useEffect } from 'react'
import { createToken } from './lib/createAccessToken'
import { createRoom } from './lib/createRoom'
import { joinRoom } from './lib/joinRoom';
import { stateChanged } from './lib/stateChanges';
require('dotenv').config();


const accountSID = process.env.REACT_APP_ACCOUNT_SID
const authToken = process.env.REACT_APP_AUTH_TOKEN
const apiKey = process.env.REACT_APP_API_KEY
const apiSecret = process.env.REACT_APP_API_SECRET

const AccessToken = require('twilio').jwt.AccessToken;
const client = require('twilio')(accountSID, authToken);
const VideoGrant = AccessToken.VideoGrant;

var identity = undefined;
var roomName = undefined;

function Room() {
    var [room, setRoomName] = useState();
    var [name, setName] = useState();

    console.log("This app is mainly created to help people connected while they can video chat. They are required to be at home to be able to join the video chat. Celebirty's choose only 8 participants and the participants can invite friends.")

    const createTwilioRoom = async (evt) => {
        evt.preventDefault();
        roomName = room;
        identity = name;
        createToken(identity, roomName)
        createRoom(roomName)
        joinRoom(roomName)
        console.log(roomName)
    }

    //form to share https://www.cognitoforms.com/SevaerDigital/VIPParty

    return(
        <>
            <input placeholder="Room Name" value={room} onChange={e => setRoomName(e.target.value)}></input>
            <input placeholder="Personal Name" value={name} onChange={e => setName(e.target.value)}></input>
            <button onClick={createTwilioRoom}>Create room</button>
            <div id="userMedia"></div>

            <div>
            <h1>Room name: {room}</h1>
            <p>Press F12 and go to console and you can see that a new room has been created</p>
            </div>
        </>
    )
}

export default Room
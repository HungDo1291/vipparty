import React, { useState } from 'react'
import Video from 'twilio-video'
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
var tokenId = undefined;

function Room() {
    var [room, setRoomName] = useState();
    var [name, setName] = useState();

    const getToken = (evt) => {
        evt.preventDefault();
        roomName = room;
        identity = name;
        createToken()
        createRoom()
        searchRoom()
    }

    //request audio and video
    Video.createLocalTracks().then(localTracks => {
        localTracks.forEach(tracks => {
            var localMediaContainer = document.getElementById('local-media');
            localTracks.forEach(function(track) {
                localMediaContainer.appendChild(track.attach());
            })
        })
    })



    //creates video grant
    const videoGrant = new VideoGrant({
        room: roomName
    })

    //creates access token for user
    function createToken() {
        const token = new AccessToken(accountSID, apiKey, apiSecret);
        token.addGrant(videoGrant);
        token.identity = identity;
        tokenId = token.toJwt();
    }

    //creates a room and joins
    function createRoom() {
        client.video.rooms.create({ uniqueName: roomName }).then(room => console.log(room.sid))
        Video.connect(tokenId, { name: roomName, audio: true }).then(room => {
            Video.createLocalVideoTrack().then(localTrack => {
                room.localParticipant.publishTrack(localTrack);
            })

            room.participants.forEach(participantConnected);
            room.on('participantConnected', participantConnected);

        })
    }

    function participantConnected(participant) {
        console.log(`User connected ${participant.identity}`)

        const div = document.createElement('div');
        div.id = participant.sid;
        div.innerText = participant.identity;

        participant.on('trackSubscribed', track => trackSubscribed(div, track));
        participant.on('trackUnsubscribed', trackUnsubscribed);

        participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              trackSubscribed(div, publication.track);
            }
        });

        document.body.appendChild(div);
    }

    function trackSubscribed(div, track) {
        div.appendChild(track.attach());
    }
      
    function trackUnsubscribed(track) {
        track.detach().forEach(element => element.remove());
    }

    //searches if room exist
    function searchRoom() {
        client.video.rooms(roomName).fetch().then(room => console.log(`Room found with the name of ${room.uniqueName}`))
    }

    function buttonSearch() {
        client.video.rooms(roomName).fetch().then(room => console.log(`Room found with the name of ${room.uniqueName}`))
    }

    //form to share https://www.cognitoforms.com/SevaerDigital/VIPParty

    return(
        <>
            <input placeholder="Room Name" value={room} onChange={e => setRoomName(e.target.value)}></input>
            <input placeholder="Personal Name" value={name} onChange={e => setName(e.target.value)}></input>
            <button onClick={getToken}>Join class</button>
            <button onClick={() => buttonSearch()}>Find class</button>
            <div id="local-media"></div>
        </>
    )
}

export default Room
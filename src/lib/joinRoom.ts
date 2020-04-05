import { userToken } from './createAccessToken'
import { participant } from './participant'
const { connect, createLocalTracks }  = require('twilio-video');

export function joinRoom(roomName: string) {
    createLocalTracks({
        audio: true,
        video: { width: 640 }
    }).then(localTracks => {
        connect(userToken, { name: roomName, tracks: localTracks }).then(room => {
            console.log(`Successfully joined a room: ${room} and name of ${room.name}`)
            room.on('participantConnected', participantConnect => {
                console.log(`Participant connected ${participantConnect}`)
            })
            room.on('participantConnected', participant => {
                participant(participant)
            });
        }, error => {
            console.error(`Unable to connect to room: ${error.message}`)
        })
    }).then(currentRoom => {
        console.log(`User has joined after local devices been setup. Room: ${currentRoom}`)
    })
}

import { joinRoom } from './joinRoom';

const accountSID = process.env.REACT_APP_ACCOUNT_SID
const authToken = process.env.REACT_APP_AUTH_TOKEN

const client = require('twilio')(accountSID, authToken)

export function createRoom(roomName: string) {
    client.video.rooms.create({ uniqueName: roomName }).then(room => {
        console.log(`This is the room sid = ${room.sid}`)
    }).catch(err => {
        console.log(`there was an error ${err.message}`)
        if(err.message === "Room exists") {
            alert("room exists")
            joinRoom(roomName)
        }
    })
}
const accountSID = process.env.REACT_APP_ACCOUNT_SID
const authToken = process.env.REACT_APP_AUTH_TOKEN

const client = require('twilio')(accountSID, authToken)


export function stateChanged(room: any) {
    // const localParticipant = room.localParticipant;

    // //log any participants already connected to the room
    // room.participants.forEach(participant => {
    //     console.log(`Participant ${participant.identity}`)
    // })

    // //log new participants as they connect to the room 
    // room.once('participantConnected', participant => {
    //     //create new screen with his camera and mic included
    //     console.log(`New participant has connected ${participant.identity}`)
    // })
}
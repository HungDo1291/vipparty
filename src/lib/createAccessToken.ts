const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const accountSID = process.env.REACT_APP_ACCOUNT_SID
const apiKey = process.env.REACT_APP_API_KEY
const apiSecret = process.env.REACT_APP_API_SECRET

export var userToken;

export function createToken(userEmail: string, roomName: string) {
    const videoGrant = new VideoGrant({
        room: roomName
    })
    
    const token = new AccessToken(accountSID, apiKey, apiSecret);
    token.addGrant(videoGrant);
    token.identity = userEmail;
    console.log(token.toJwt())
    userToken = token.toJwt()
}
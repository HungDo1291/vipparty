export function participant(participant) {
    console.log(`Participant "${participant.identity}" connected`);
              
                participant.tracks.forEach(track => {
                  document.getElementById('userMedia')?.appendChild(track.attach());
                });
              
                participant.on('trackAdded', track => {
                  document.getElementById('userMedia')?.appendChild(track.attach());
                });
}
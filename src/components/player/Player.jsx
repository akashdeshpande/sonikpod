import { Howl } from "howler";
import { useState } from "react";

function Player(props) {

    const [mediaUrl, setMediaUrl] = useState("");
    const [sound, setSound] = useState(null);

    function playSound() {
        if(sound) {
            sound.play();
        }
            
        else {
            const sound = new Howl({
                src: mediaUrl,
                preload: true,
                onend: () => console.log("playback finished"),
                onloaderror: (id, error) => console.error("Error loading sound source: ", error )
            });

            setSound(sound);

            sound.play();
        }
    }

    function pauseSound() {
        if(sound)
            sound.pause();
    }

    function stopSound() {
        if(sound)
            sound.stop();
    }

    return <>
        <p>Input URL for sound:</p>
        <input type="text" id="mediaUrl" onChange={(e) => setMediaUrl(e.target.value) } value={mediaUrl}/>


        <br />
        <br />
        <button onClick={playSound}>Play</button>
        <button onClick={pauseSound}>Pause</button>
        <button onClick={stopSound}>Stop</button>
    </>;
}

export default Player;
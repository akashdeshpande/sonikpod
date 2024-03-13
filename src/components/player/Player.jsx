import { Howl } from "howler";
import { useState } from "react";

function Player(props) {

    // https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm

    const [mediaUrl, setMediaUrl] = useState("");
    const [sound, setSound] = useState(null);
    const [volume, setVolume] = useState(1.0);
    const [speed, setSpeed] = useState(1.0);

    function playSound() {
        if(sound) {
            sound.play();
        }
            
        else {
            const sound = new Howl({
                src: mediaUrl,
                preload: true,
                onend: () => console.log("playback finished"),
                onloaderror: (id, error) => console.error("Error loading sound source: ", error ),
                html5: true
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

    function seekForward() {
        if(sound) {
            sound.seek((sound.seek() + 5));
        }
    }

    function seekBackward() {
         if(sound) {
            sound.seek((sound.seek() - 5));
        }   
    }

    function handleVolumeChange(event) {
        setVolume(event.target.value);
        if(sound)
            sound.volume(event.target.value);
    }

    function handleSpeedChange(event) {
        setSpeed(event.target.value);
        if(sound)
            sound.rate(event.target.value)  
    }

    return <>
        <p>Input URL for sound:</p>
        <input type="text" id="mediaUrl" onChange={(e) => setMediaUrl(e.target.value) } value={mediaUrl}/>


        <br />
        <br />
        <button onClick={playSound}>Play</button>
        <button onClick={pauseSound}>Pause</button>
        <button onClick={stopSound}>Stop</button>

        <button onClick={seekForward}>Seek Forward (+5s)</button>
        <button onClick={seekBackward}>Seek Backward(-5s)</button>

        <br />
        <p>Volume: {Math.floor(volume * 100)}</p>
        <input type="range" name="volume" id="volume" value={volume} onChange={handleVolumeChange} min={0.0} max={1.0} step={0.01}/>

        <br />
        <p>Speed: {speed}x</p>
        <input type="range" name="speed" id="speed" value={speed} onChange={handleSpeedChange} min={0.5} max={4.0} step={0.5}/>
    </>;
}

export default Player;
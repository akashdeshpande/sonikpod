import { Howl } from "howler";
import { useEffect, useState } from "react";

function Player(props) {

    // https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm
    // https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.webm

    const [mediaUrl, setMediaUrl] = useState("");
    const [sound, setSound] = useState(null);
    const [volume, setVolume] = useState(1.0);
    const [speed, setSpeed] = useState(1.0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [renderInterval, setRenderInterval] = useState(null);

    useEffect( () => {
        
        if(renderInterval) {
            clearInterval(renderInterval);
        }
        const interval = setInterval( () => {
            if(sound && sound.playing()) {
                setElapsedTime(sound.seek());
                setDuration(sound.duration());
            }
        }, 100);

        setRenderInterval(interval);

        return () => {
            clearInterval(renderInterval);
        }

    }, [sound])

    function playSound() {
        if(sound && !sound.playing()) {
            sound.play();
        }
            
        else if(mediaUrl != ""){
            const sound = new Howl({
                src: mediaUrl,
                preload: true,
                onend: () => console.log("playback finished"),
                onloaderror: (id, error) => console.error("Error loading sound source: ", error ),
                html5: true
            });

            setSound(sound);

            sound.play();
        } else {
            console.error("Can't play! media url is empty", mediaUrl);
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

    function handleLoadSong() {
        if(sound) {
            if(sound.playing())
                sound.stop();
            
            const newSound = new Howl({
                src: mediaUrl,
                preload: true,
                onend: () => console.log("playback finished"),
                onloaderror: (id, error) => console.error("Error loading sound source: ", error ),
                html5: true
            });

            setSound(newSound); 

            newSound.play();
        } else {
            playSound();
        }
    }

    return <>
        <p>Input URL for sound:</p>
        <input type="text" id="mediaUrl" onChange={(e) => setMediaUrl(e.target.value) } value={mediaUrl}/>
        <button onClick={handleLoadSong}>Load</button>


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

        <br />
        <p>Time: {elapsedTime} / {duration}</p>
    </>;
}

export default Player;
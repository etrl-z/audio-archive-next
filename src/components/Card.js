import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Card({ title }) {

    const storage = getStorage();
    const myRef = useRef();

    const [audioSrc, setAudioSrc] = useState();
    const [isPlaying, toggleIsPlaying] = useState(false);

    useEffect(() => {
        let volume = document.getElementById("volume-slider");
        myRef.current.volume = volume.value / 100;
        
        var playPromise = myRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                toggleIsPlaying(true);

            }).catch(error => {
                toggleIsPlaying(false);
            });
        }

        myRef.current.addEventListener("ended", function () {
            toggleIsPlaying(false);
        });

    }, [audioSrc]);

    const play = async function () {
        setAudioSrc(await getDownloadURL(ref(storage, `audio/${title}`)))

        if (typeof window !== "undefined") {
            let volume = document.getElementById("volume-slider");
            volume.addEventListener("change", function (e) {
                myRef.current.volume = e.currentTarget.value / 100;
            })
        }
    }

    const stop = function () {
        myRef.current.pause();
        myRef.current.currentTime = 0;
        toggleIsPlaying(false);
    }

    return (
        <>
            <audio
                ref={myRef}
                src={audioSrc}
            />

            <div className={`card ${isPlaying ? "card-active" : null}`}>
                <p>{title.replace(".opus", "")}</p>
                <div className='buttons'>
                    {isPlaying ? (
                        <button onClick={stop}>◼</button>) : (
                        <button onClick={play}>▶</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Card

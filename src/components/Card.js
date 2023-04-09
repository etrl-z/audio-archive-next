import React from 'react'
import { useState, useRef } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Card({ title }) {

    const storage = getStorage();
    const myRef = useRef();

    const [audioSrc, setAudioSrc] = useState();
    const [isPlaying, toggleIsPlaying] = useState(false);
    const [active, setActive] = useState();

    const setClassActive = (active) => {
        setActive(active ? "card-active" : null);
    };

    const play = async function () {
        setAudioSrc(await getDownloadURL(ref(storage, `audio/${title}`)))
        myRef.current.play();
        toggleIsPlaying(true);
        setClassActive(true);

        myRef.current.addEventListener("ended", function () {
            toggleIsPlaying(false);
            setClassActive(false);
        });

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
        setClassActive(false);
    }

    return (
        <>
            <audio
                ref={myRef}
                src={audioSrc}
            />

            <div className={`card ${active}`}>
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

import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Card({ title }) {

    const storage = getStorage();
    const myRef = useRef();

    const [audioSrc, setAudioSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Quando audioSrc cambia, prova a riprodurre
    useEffect(() => {
        if (audioSrc && myRef.current) {
            myRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                setIsPlaying(false);
            });
        }
    }, [audioSrc]);

    const play = async () => {
        // Se l’audio è già impostato, riproduci subito
        if (audioSrc) {
            myRef.current.play();
            setIsPlaying(true);
            return;
        }

        // Altrimenti scarica l’URL da Firebase e imposta il src
        const url = await getDownloadURL(ref(storage, `audio/${title}`));
        setAudioSrc(url);
    };

    const stop = () => {
        if (myRef.current) {
            myRef.current.pause();
            myRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const volumeSlider = document.getElementById("volume-slider");
        if (volumeSlider) {
            const handleVolumeChange = e => {
                if (myRef.current) myRef.current.volume = e.currentTarget.value / 100;
            };
            volumeSlider.addEventListener("change", handleVolumeChange);
            return () => volumeSlider.removeEventListener("change", handleVolumeChange);
        }
    }, []);

    // Quando l’audio finisce naturalmente
    const handleEnded = () => {
        setIsPlaying(false);
        myRef.current.currentTime = 0; // reset posizione
    };

    return (
        <>
            <audio ref={myRef} src={audioSrc} onEnded={handleEnded} />

            <div className={`card ${isPlaying ? "card-active" : null}`}>
                <p>{title}</p>
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

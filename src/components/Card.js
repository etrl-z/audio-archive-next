import React from 'react'
import { useState } from 'react';

function Card({ title, audio }) {

    const [active, setClassActive] = useState(null);

    const setActive = (active) => {
        var style = active ? "card-active" : null
        setClassActive(style);
    };

    const play = function () {
        audio.play();
        setActive(true);
    }

    const pause = function () {
        audio.pause();
    }
    
    const stop = function () {
        audio.pause();
        audio.currentTime = 0;
        setActive(false);
    }

    if (typeof window !== "undefined") {
        let volume = document.getElementById("volume-slider");
        volume.addEventListener("change", function (e) {
            audio.volume = e.currentTarget.value / 100;
        })
    }

    return (
        <div class={`card ${active}`}>
            <p>{title}</p>
            <div>
                <button onClick={play}>PLAY</button>
                <button onClick={pause}>PAUSE</button>
                <button onClick={stop}>STOP</button>
            </div>

        </div>
    )
}

export default Card

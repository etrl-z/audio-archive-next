import React from 'react'
import { useState } from 'react';

function Card({ title, url }) {

    const [audio] = useState(typeof Audio !== "undefined" && new Audio(url));
    const [active, setClassActive] = useState(null);

    const setActive = (active) => {
        var style = active ? "card-active" : null
        setClassActive(style);
    };

    const play = function () {
        setActive(true);
        audio.play();
    }

    const stop = function () {
        setActive(false);
        audio.pause();
        audio.currentTime = 0;
    }

    if (typeof window !== "undefined") {
        let volume = document.getElementById("volume-slider");
        volume.addEventListener("change", function (e) {
            audio.volume = e.currentTarget.value / 100;
        })

        audio.addEventListener("ended", function () {
            setActive(false);
        });
    }

    return (
        <div className={`card ${active}`}>
            <p>{title.replace(".opus", "")}</p>
            <div className='buttons'>
                <button onClick={play}>▶</button>
                <button onClick={stop}>◼</button>
            </div>

        </div>
    )
}

export default Card

import React from 'react'
import { useState, useRef } from 'react';

function Card({ title, url }) {

    const [audio] = useState(typeof Audio !== "undefined" && new Audio(url));
    const play = function () {
        audio.play();
    }
    const pause = function () {
        audio.pause();
    }
    const stop = function () {
        audio.pause();
        audio.currentTime = 0;
    }

    return (
        <div class="card">
            <p>{title}</p>
            <div>
                <input type="range" min="1" max="100" class="slider" />
                <button onClick={play}>PLAY</button>
                <button onClick={pause}>PAUSE</button>
                <button onClick={stop}>STOP</button>
            </div>

        </div>
    )
}

export default Card

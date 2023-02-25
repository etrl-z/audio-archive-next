import React from 'react'
import styled from 'styled-components'

function Card({ data, url }) {

    const audio = new Audio(url)

    const play = function () {
        audio.play();
    }

    const pause = function () {
        audio.pause();
    }

    const stop = function () {
        location.reload();
    }

    return (
        <div class="card">
            <p>{data.title}</p>
            <div>
                <button onClick={play}>PLAY</button>
                <button onClick={pause}>PAUSE</button>
                <button onClick={stop}>STOP</button>
            </div>

        </div>
    )
}

export default Card


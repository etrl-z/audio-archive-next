import React from 'react'
import { useState } from 'react';

export default function getAudioFromUrl(url) {

    const [audio] = useState(typeof Audio !== "undefined" && new Audio(url));
    return audio;
}

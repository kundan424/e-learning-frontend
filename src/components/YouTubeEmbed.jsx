import React from 'react';
import Plyr from "plyr-react";      
import "plyr-react/plyr.css";      

function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
}

function YouTubeEmbed({ url }) {
    const videoId = getYouTubeId(url);

    if (!videoId) {
        return <p className="text-red-500">Invalid YouTube URL</p>;
    }

    const videoSource = {
        type: 'video',
        sources: [
            {
                src: videoId,
                provider: 'youtube',
            },
        ],
    };

    const plyrOptions = {
        controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen',
        ],
        youtube: {
            rel: 0,
            modestbranding: 1,
        },
    };

    return (
        <div className="aspect-video rounded-lg shadow-lg overflow-hidden">
            <Plyr source={videoSource} options={plyrOptions} />
        </div>
    );
}

export default YouTubeEmbed;

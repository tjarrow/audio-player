import React, { useState, useEffect, useRef } from "react";
import PlayerControls from "./Controls";
import tracks from "../assets/tracks-info";
import iconFavourite from "../assets/icons/star-empty.svg";

const AudioPlayer = ({type}) => {
    const [isTrackLoading, setIsTrackLoading] = useState(true);
    const [currentAudioTime, setCurrentAudioTime] = useState(null);
    const [remainingAudioTime, setRemainingAudioTime] = useState(null);
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { title, artist, color, image, audioSrc } = tracks.find(({ title }) => title === type);

    // Refs
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    // Destructure for conciseness
    const { duration } = audioRef.current;

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #000), color-stop(${currentPercentage}, #cecbcb))
  `;

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                rewindForward();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    };

    const rewindBackwards = () => {
        const currTime = audioRef.current.currentTime;
        if (currTime < 10) {
            audioRef.current.currentTime = 0
        }
        audioRef.current.currentTime -= 10;
    };

    const rewindForward = () => {
        const currTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (duration - currTime < 10) {
            audioRef.current.currentTime = duration;
        }
        audioRef.current.currentTime += 10;
    };

    const convertSeconds = (numOfSec) => {
        let s = Math.trunc(numOfSec);
        return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    }, [trackIndex]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current.readyState > 0) {
            setIsTrackLoading(false);
        }
    }, [audioRef.current.readyState])

    useEffect(() => {
        setCurrentAudioTime(convertSeconds(audioRef.current.currentTime));
        const remainedTime = convertSeconds(audioRef.current.duration - audioRef.current.currentTime)
        setRemainingAudioTime(remainedTime);
    } ,[audioRef.current.currentTime]);

    return (
        <div className="audio-player">
            <div className="track-info">
                <div className='reps-block'>

                </div>
                <div className={'track-info-bg track-info-bg-' + color}>
                    <img
                        className="artwork"
                        src={image}
                        alt={`track artwork for ${title} by ${artist}`}
                    />
                </div>
                {isTrackLoading && <div className='audio-loading-block'>Audio is loading...</div>
                }
                {!isTrackLoading &&
                    <div className="p-4">
                        <h2 className="title">{title}</h2>
                        <div className='subtitle-block'>
                            <h3 className="subtitle">{artist}</h3>
                            <img className="icon-favourite" src={iconFavourite} alt=""/>
                        </div>
                        <PlayerControls
                            isPlaying={isPlaying}
                            onPrevClick={rewindBackwards}
                            onNextClick={rewindForward}
                            onPlayPauseClick={setIsPlaying}
                        />
                        <div className='audio-progress-block'>
                            <div className='audio-time'>{currentAudioTime}</div>
                            <input
                                type="range"
                                value={trackProgress}
                                step="1"
                                min="0"
                                max={duration ? duration : `${duration}`}
                                className="progress"
                                onChange={(e) => onScrub(e.target.value)}
                                onMouseUp={onScrubEnd}
                                onKeyUp={onScrubEnd}
                                style={{background: trackStyling}}
                            />
                            <div className='audio-time'>{remainingAudioTime}</div>
                        </div>
                        <button className={'submit-btn submit-btn-bg-' + color}>Submit</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default AudioPlayer;

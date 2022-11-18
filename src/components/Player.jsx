import React, { useState, useEffect, useRef } from "react";
import PlayerControls from "./Controls";
import tracks from "../assets/tracks-info";
import iconStarEmpty from "../assets/icons/star-empty.svg";
import iconStarFilled from "../assets/icons/star-filled.svg";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AudioPlayer = ({ type, isOpen }) => {
    const [isTrackFavorite, setIsTrackFavorite] = useState(false);
    const [favoriteTracksList, setFavoriteTracksList] = useState([]);
    const [isAddedToFavBefore, setIsAddedToFavBefore] = useState(false);
    const [playbackRateState, setPlaybackRateState] = useState(1);
    const [currentAudioTime, setCurrentAudioTime] = useState('0:00');
    const [remainingAudioTime, setRemainingAudioTime] = useState('--:--');
    const [currentRepsValue, setCurrentRepsValue] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const { title, artist, color, image, audioSrc } = tracks.find(({ title }) => title === type);

    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);

    let { duration, currentTime } = audioRef.current;

    currentTime = Math.floor(currentTime);
    // const currentRate = audioRef.current

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #000), color-stop(${currentPercentage}, #cecbcb))
  `;
    const maxReps = 6;
    const timeToUpdateReps = Math.floor(duration / maxReps);
    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                rewindForward();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };

    const switchPlaybackRate = () => {
        const newRate = playbackRateState + 0.5;
        if (playbackRateState === 2) {
            setPlaybackRateState(1);
            audioRef.current.playbackRate = 1;
        } else {
            setPlaybackRateState(newRate);
            audioRef.current.playbackRate = newRate;
        }
    }

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

    const checkIfTrackIsFavorite = () => {
        const favoriteTracks = JSON.parse(localStorage.getItem("favoriteTracks") || "[]");
        setFavoriteTracksList(favoriteTracks);
        const isAddedToFav = favoriteTracks.filter((track) => {
            return track.type === type && track.title === artist
        }).length > 0;

        if (isAddedToFav) {
            setIsAddedToFavBefore(true);
            setIsTrackFavorite(true);
        }
    }

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);

        checkIfTrackIsFavorite();

        if (type === 'Audiobook') {
            const lastSavedTime = JSON.parse(localStorage.getItem('audioPausedTime'));
            if (lastSavedTime) {
                audioRef.current.currentTime = lastSavedTime;
            }
        }
        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }

    }, []);

    useEffect(() => {
        updateTimeAndReps();
    },[currentTime]);

    const updateTimeAndReps = () => {
        setCurrentAudioTime(convertSeconds(currentTime));
        if (audioRef.current.readyState) {
            const remainedTime = convertSeconds(duration - currentTime);
            setRemainingAudioTime(remainedTime);
        }

        if (currentTime / timeToUpdateReps > currentRepsValue && currentRepsValue < maxReps) {
            const incRepsValue = currentRepsValue + 1;
            setCurrentRepsValue(incRepsValue);
        }
    }

    const closePlayer = () => {
        isOpen(false);
        if (type === 'Audiobook') {
            localStorage.setItem('audioPausedTime', currentTime);
        }
        audioRef.current.pause();
        clearInterval(intervalRef.current);
        if (isTrackFavorite && !isAddedToFavBefore) {
            const favoriteTracks = [...favoriteTracksList];
            favoriteTracks.push({type: type, title: artist})
            localStorage.setItem('favoriteTracks', JSON.stringify(favoriteTracks));
        }

        if (!isTrackFavorite && isAddedToFavBefore) {
            const favoriteTracks = favoriteTracksList.filter((track) => {
                return track.type !== type && track.title !== artist
            });
            localStorage.setItem('favoriteTracks', JSON.stringify(favoriteTracks));
        }
    }

    return (
        <div className="audio-player">
            <FontAwesomeIcon icon={faClose} className='audio-player-close' onClick={() => closePlayer()}/>
            <div className="track-info">
                <div className={'track-info-bg track-info-bg-' + color}>
                    {type !== 'Audiobook' &&
                        <div className='reps-block'>
                            <CircularProgressbar
                                value={currentRepsValue}
                                maxValue={maxReps} text={`${currentRepsValue}/${maxReps} Reps`}
                                styles={buildStyles({
                                    textSize: '14px',
                                    textColor: '#000',
                                    trailColor: '#d6d6d6',
                                })}/>
                        </div>
                    }
                    {type !== 'Gym session' && <img
                        className="track-inner-image"
                        src={image}
                        alt=''
                    />}
                </div>
                <div className="p-10">
                    <h2 className="title">{title}</h2>
                    <div className='subtitle-block'>
                        <h3 className="subtitle">{artist}</h3>
                        <button onClick={() => setIsTrackFavorite(s => !s)}>
                            {!isTrackFavorite &&
                                <img className="icon-favourite" src={iconStarEmpty} alt=""/>
                            }
                            {isTrackFavorite &&
                                <img className="icon-favourite" src={iconStarFilled} alt=""/>
                            }
                        </button>
                    </div>
                    <PlayerControls
                        isPlaying={isPlaying}
                        onPrevClick={rewindBackwards}
                        onNextClick={rewindForward}
                        onPlayPauseClick={setIsPlaying}
                        trackType={type}
                        onPlaybackRateClick={switchPlaybackRate}
                        playbackRate={playbackRateState}
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
                    <button className={currentRepsValue === maxReps ?
                       'submit-btn submit-btn-' + color
                       : 'submit-btn submit-btn-disabled-' + color }
                       onClick={closePlayer}
                       disabled={currentRepsValue !== maxReps}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;

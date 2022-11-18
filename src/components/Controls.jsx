import React from "react";
import playIcon from "../assets/icons/icon-play.svg";
import pauseIcon from "../assets/icons/icon-pause.svg";
import fastForwardIcon from "../assets/icons/icon-forward.svg";
import fastBackwardIcon from "../assets/icons/icon-back.svg";

const PlayerControls = ({
       isPlaying,
       onPlayPauseClick,
       onPrevClick,
       onNextClick,
       trackType,
       onPlaybackRateClick,
       playbackRate
}) => (
    <div className='audio-controls-wrapper'>
        <div className="audio-controls">
            <button
                type="button"
                className="prev"
                aria-label="Previous"
                onClick={onPrevClick}
            >
                <img src={fastBackwardIcon} alt=""/>
            </button>
            {isPlaying ? (
                <button
                    type="button"
                    className="pause"
                    onClick={() => onPlayPauseClick(false)}
                    aria-label="Pause"
                >
                    <img src={pauseIcon} alt=""/>
                </button>
            ) : (
                <button
                    type="button"
                    className="play"
                    onClick={() => onPlayPauseClick(true)}
                    aria-label="Play"
                >
                    <img src={playIcon} alt=""/>
                </button>
            )}
            <button
                type="button"
                className="next"
                aria-label="Next"
                onClick={onNextClick}
            >
                <img src={fastForwardIcon} alt=""/>
            </button>
        </div>
        { trackType === 'Audiobook' &&
        <button onClick={onPlaybackRateClick} className='text-black font-bold'>{playbackRate}x</button>
        }
    </div>
);

export default PlayerControls;

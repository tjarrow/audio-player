import React from "react";
import playIcon from "../assets/icons/icon-play.svg";
import pauseIcon from "../assets/icons/icon-pause.svg";
import fastForwardIcon from "../assets/icons/icon-forward.svg";
import fastBackwardIcon from "../assets/icons/icon-back.svg";

const PlayerControls = ({
   isPlaying,
   onPlayPauseClick,
   onRewindBackClick,
   onRewindForwardClick,
   trackType,
   onPlaybackRateClick,
   playbackRate
}) => (
    <div className='audio-controls-wrapper'>
        <div className="audio-controls">
            <button
                type="button"
                aria-label="Rewind-back"
                onClick={onRewindBackClick}
            >
                <img src={fastBackwardIcon} alt=""/>
            </button>
            {isPlaying ? (
                <button
                    type="button"
                    onClick={() => onPlayPauseClick(false)}
                    aria-label="Pause"
                >
                    <img src={pauseIcon} alt=""/>
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => onPlayPauseClick(true)}
                    aria-label="Play"
                >
                    <img src={playIcon} alt=""/>
                </button>
            )}
            <button
                type="button"
                aria-label="Rewind-forward"
                onClick={onRewindForwardClick}
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

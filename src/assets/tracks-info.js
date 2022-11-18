import daily_focus from './audio/cinematic-documentary-115669.mp3';
import audiobook from './audio/let-the-mystery-unfold-122118.mp3';
import gym_session from './audio/space-120280.mp3';
import imgSrc from '../assets/images/daily-focus.png';
import imgSrc2 from '../assets/images/audio-book.png';
import imgSrc3 from '../assets/images/gym-session.png';

const tracks = [
    {
        title: "Daily focus",
        artist: "Find the Path of Ease & Flow",
        audioSrc: daily_focus,
        image: imgSrc,
        color: "yellow"
    },
    {
        title: "Audiobook",
        artist: "Chapter 1",
        audioSrc: audiobook,
        image: imgSrc2,
        color: "blue"
    },
    {
        title: "Gym session",
        artist: "Tactile: 2 min",
        audioSrc: gym_session,
        image: imgSrc3,
        color: "green"
    }
];

export default tracks;

import burial from './audio/Burial_Archangel.mp3';
import daniel_avery from './audio/Daniel_Avery_Lone_Swordsman.mp3';
import dusky from './audio/Dusky_Ingrid_Is_A_Hybrid.mp3';
import imgSrc from '../assets/images/daily-focus.png';
import imgSrc2 from '../assets/images/audio-book.png';
import imgSrc3 from '../assets/images/gym-session.png';

const tracks = [
    {
        title: "Daily focus",
        artist: "Find the Path of Ease & Flow",
        audioSrc: burial,
        image: imgSrc,
        color: "yellow"
    },
    {
        title: "Audiobook",
        artist: "Chapter 1",
        audioSrc: daniel_avery,
        image: imgSrc2,
        color: "blue"
    },
    {
        title: "Gym session",
        artist: "Tactile: 2 min",
        audioSrc: dusky,
        image: imgSrc3,
        color: "green"
    }
];

export default tracks;

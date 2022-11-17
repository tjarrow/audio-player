import burial from './audio/Burial_Archangel.mp3';
import daniel_avery from './audio/Daniel_Avery_Lone_Swordsman.mp3';
import dusky from './audio/Dusky_Ingrid_Is_A_Hybrid.mp3';
import imgSrc from '../assets/images/audio-book.png';
import imgSrc2 from '../assets/images/daily-focus.png';
import imgSrc3 from '../assets/images/gym-session.png';

const tracks = [
    {
        title: "Archangel",
        artist: "Burial",
        audioSrc: burial,
        image: imgSrc,
        color: "#00aeb0"
    },
    {
        title: "Lone Swordsman",
        artist: "Daniel Avery",
        audioSrc: daniel_avery,
        image: imgSrc2,
        color: "#ffb77a"
    },
    {
        title: "Ingrid Is A Hybrid",
        artist: "Dusky",
        audioSrc: dusky,
        image: imgSrc3,
        color: "#5f9fff"
    }
];

export default tracks;

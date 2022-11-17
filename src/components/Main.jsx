import AudioPlayer from "./Player";
import tracks from "../assets/tracks-info";
import {useState} from "react";

const MainMenu = () => {

    const [isPlayerShown, setIsPlayerShown] = useState(false);
    const sections = ['Daily focus', 'Audio book', 'Gym session'];

    const renderSections = sections.map((section) =>
             <button onClick={() => setIsPlayerShown(true)} className='menu-block__item'>{section}</button>
    );

    return (
        <>
            {!isPlayerShown && <>
                <div className='menu-header'>Welcome to audio player, please select the section:</div>
                <div className='menu-block'>
                    {renderSections}
                </div>
            </>}
            {isPlayerShown && <AudioPlayer tracks={tracks}/>}
        </>
    );
}

export default MainMenu;

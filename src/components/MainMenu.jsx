import AudioPlayer from "./Player";
import { useState } from "react";

const MainMenu = () => {

    const [isPlayerShown, setIsPlayerShown] = useState(false);
    const [currentTrackType, setCurrentTrackType] = useState(null);

    const sections = ['Daily focus', 'Audiobook', 'Gym session'];

    const renderSections = sections.map((section, i) =>
        <button key={i} onClick={() => openPlayerByType(section)} className='menu-block__item'>{section}</button>
    );

    const openPlayerByType = (type) => {
        setIsPlayerShown(true);
        setCurrentTrackType(type);
    }

    return (
        <>
            {!isPlayerShown && <>
                <div className='menu-header'>Welcome to audio player, please select the section:</div>
                <div className='menu-block'>
                    {renderSections}
                </div>
            </>}
            {isPlayerShown && <AudioPlayer audioType={currentTrackType} isOpen={setIsPlayerShown}/>}
        </>
    );
}

export default MainMenu;

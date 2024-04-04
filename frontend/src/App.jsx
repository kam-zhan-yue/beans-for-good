import { useRef, useState } from 'react';

import { PhaserGame } from './game/PhaserGame';
import { ReactOverlay } from './game/ReactOverlay'; // Assuming this import is correct

import SignUpPage from './user/SignUpPage';

function App() {
    const phaserRef = useRef();

    const interactionStarted = (interaction) => {
        console.log(`Frontend Detected Interaction Started with ${interaction.facilityID} of type ${interaction.facilityType}`);
    };

    const mode = 1;

    return (
        <div id="app">
            {mode === 0 && 
                    <SignUpPage />}
            {mode === 1 && <>
                    <PhaserGame 
                        ref={phaserRef}
                        interactionStarted={interactionStarted}/>
                    {<ReactOverlay ref={phaserRef}/>}
                    </>
            }
        </div>
    );
}

export default App;

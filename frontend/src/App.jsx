import { useRef, useState } from 'react';

import { PhaserGame } from './game/PhaserGame';
import { FacilityPanel } from './ui/FacilityPanel';
import { ReactOverlay } from './ui/ReactOverlay'; // Assuming this import is correct


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './user/Home';
import SignUpPage from './user/SignUpPage';
import LogInPage from './user/LogInPage';

function App() {
    const phaserRef = useRef();
    const facilityPanelRef = useRef();

    const interactionStarted = (interaction) => {
        console.log(`Frontend Detected Interaction Started with ${interaction.facilityID} of type ${interaction.facilityType}`);
        facilityPanelRef.current.handleInteractionStart(interaction);
    };
    
    const interactionOver = () => {
        // phaserRef.current.interactionOver();

        console.log("interaction over");
        console.log(`phaserRef: ${phaserRef} current: ${phaserRef.current} scene: ${phaserRef.current.scene}`);
        const scene = phaserRef.current.scene;

        if (scene)
        {
            scene.changeScene();
        }
    }

    const changeScene = () => {

        console.log('change scene');
        const scene = phaserRef.current.scene;

        if (scene)
        {
            scene.changeScene();
        }
    }
    const mode = 1; // Change this to 0 to see the login/signup pages
    
    return (
        <Router>
            <div id="app">
                {mode === 0 && 
                            
                            <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/login" element={<LogInPage />} />
                            </Routes>
                        
                }
                {mode === 1 && <>
                        <PhaserGame 
                            ref={phaserRef}
                            interactionStarted={interactionStarted}/>
                        <FacilityPanel 
                            ref={facilityPanelRef}
                            interactionOver={interactionOver}/>
                    </>
                }
                <div>
                    <div>
                        <button className="button" onClick={changeScene}>Change Scene</button>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;

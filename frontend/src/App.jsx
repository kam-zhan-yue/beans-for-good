import { useRef, useState } from 'react';

import { PhaserGame } from './game/PhaserGame';
import { FacilityPanel } from './ui/FacilityPanel';
import { GamePanel } from './ui/GamePanel';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './user/Home';
import SignUpPage from './user/SignUpPage';
import LogInPage from './user/LogInPage';

const AppState = {
    GAME: 'GAME',
    INVENTORY: 'INVENTORY',
    FACILITY: 'FACILITY',
};

function App() {
    const phaserRef = useRef();
    const facilityPanelRef = useRef();
    const [state, setState] = useState(AppState.GAME);

    const interactionStarted = (interaction) => {
        setState(AppState.FACILITY);
        facilityPanelRef.current.handleInteractionStart(interaction);
    };
    
    const interactionOver = () => {
        setState(AppState.GAME);
        const scene = phaserRef.current.scene;
        if (scene)
        {
            scene.interactionOver();
        }
    }

    const inventoryClicked = () => {
        console.log("inventory clicked");
        setState(AppState.INVENTORY);
        // const scene = phaserRef.current.scene;
        // if (scene)
        // {
        //     scene.interactionStarted();
        // }
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
                        {state === AppState.GAME &&
                            <GamePanel
                            inventoryClicked={inventoryClicked}
                        />}
                        {<FacilityPanel 
                            ref={facilityPanelRef}
                            interactionOver={interactionOver}/>}
                    </>
                }
            </div>
        </Router>
    );
}

export default App;

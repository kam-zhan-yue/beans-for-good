import { useRef, useState } from 'react';

import { PhaserGame } from './game/PhaserGame';
import { ReactOverlay } from './game/ReactOverlay'; // Assuming this import is correct


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './user/Home';
import SignUpPage from './user/SignUpPage';
import LogInPage from './user/LogInPage';

function App() {
    const phaserRef = useRef();

    const interactionStarted = (interaction) => {
        console.log(`Frontend Detected Interaction Started with ${interaction.facilityID} of type ${interaction.facilityType}`);
    };

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
                        {<ReactOverlay ref={phaserRef}/>}
                    </>
                }
            </div>
        </Router>
    );
}

export default App;

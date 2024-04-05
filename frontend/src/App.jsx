import { useRef, useState } from 'react';

// Game and UI
import { PhaserGame } from './game/PhaserGame';
import { FacilityPanel } from './ui/FacilityPanel';
import { GamePanel } from './ui/GamePanel';
import { InventoryPanel } from './ui/InventoryPanel';

// Server Components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './user/Home';
import SignUpPage from './user/SignUpPage';
import LogInPage from './user/LogInPage';
import { CurrencyPanel } from './ui/CurrencyPanel';

// State Machine
const AppState = {
    GAME: 'GAME',
    INVENTORY: 'INVENTORY',
    FACILITY: 'FACILITY',
    CURRENCY: 'CURRENCY',
};

function App() {
    const phaserRef = useRef();
    const [state, setState] = useState(AppState.GAME);
    const [interaction, setInteraction] = useState(null);

    const interactionStarted = (interaction) => {
        setState(AppState.FACILITY);
        setInteraction(interaction);
    };
    
    const interactionOver = () => {
        setState(AppState.GAME);
        resumeGame();
    }

    const inventoryClicked = () => {
        setState(AppState.INVENTORY);
        pauseGame();
    }

    const currencyClicked = () => {
        setState(AppState.CURRENCY);
        pauseGame();
    }

    const pauseGame = () => {
        const scene = phaserRef.current.scene;
        if (scene)
        {
            scene.interactionStarted();
        }
    }

    const resumeGame = () => {
        const scene = phaserRef.current.scene;
        if (scene)
        {
            scene.interactionOver();
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
                        {state === AppState.GAME &&
                            <GamePanel
                            inventoryClicked={inventoryClicked}
                            currencyClicked={currencyClicked}
                        />}
                        {state === AppState.FACILITY &&
                            <FacilityPanel 
                            facility={interaction}
                            interactionOver={interactionOver}/>}
                        {state === AppState.INVENTORY &&
                            <InventoryPanel 
                            interactionOver={interactionOver}/>}
                        {state === AppState.CURRENCY &&
                            <CurrencyPanel 
                            interactionOver={interactionOver}/>}
                    </>
                }
            </div>
        </Router>
    );
}

export default App;


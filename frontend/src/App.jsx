import { useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import { ReactOverlay } from './game/ReactOverlay'; // Assuming this import is correct

import SignUpPage from './user/SignUpPage';

function App() {
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    const phaserRef = useRef();
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {
        const scene = phaserRef.current.scene;
        if (scene) {
            scene.changeScene();
        }
    };

    const moveSprite = () => {
        const scene = phaserRef.current.scene;
        if (scene && scene.scene.key === 'MainMenu') {
            scene.moveLogo(({ x, y }) => {
                setSpritePosition({ x, y });
            });
        }
    };

    const addSprite = () => {
        const scene = phaserRef.current.scene;
        if (scene) {
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);
            const star = scene.add.sprite(x, y, 'star');
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });
        }
    };

    const currentScene = (scene) => {
        setCanMoveSprite(scene.scene.key !== 'MainMenu');
    };

    const mode = 1;

    return (
        <div id="app">
            {mode === 0 && 
                    <SignUpPage />}
            {mode === 1 && <>
                    <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
                    <ReactOverlay ref={phaserRef}/>
                    </>
            }
        </div>
    );
}

export default App;

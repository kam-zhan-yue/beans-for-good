import PropTypes from 'prop-types';
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';

export const PhaserGame = forwardRef(function PhaserGame ({ interactionStarted }, ref)
{
    const game = useRef();

    // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
    useLayoutEffect(() => {
        
        if (game.current === undefined)
        {
            game.current = StartGame("game-container");
            
            if (ref !== null)
            {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {

            if (game.current)
            {
                game.current.destroy(true);
                game.current = undefined;
            }

        }
    }, [ref]);

    useEffect(() => {

        EventBus.on('interaction-started', (interaction) => {
            if (interactionStarted instanceof Function)
                interactionStarted(interaction);
        });

        EventBus.on('current-scene-ready', (currentScene) => {
            ref.current.scene = currentScene;
        });

        return () => {

            EventBus.removeListener('current-scene-ready');

        }
        
    }, [ref])

    return (
        <div id="game-container">
        </div>
    );

});

// Props definitions
PhaserGame.propTypes = {
    interactionStarted: PropTypes.func
}

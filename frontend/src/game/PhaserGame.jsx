import PropTypes from 'prop-types';
import React, { forwardRef, useState, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';

export const PhaserGame = forwardRef(function PhaserGame ({interactionStarted}, ref)
{
    const game = useRef();
    const instanceId = useRef(Math.random().toString(36).substring(7)); // Generate a random ID for the instance


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
            console.log(interaction.facilityID);
            if (interactionStarted instanceof Function)
            {
                interactionStarted(interaction);
            }
        });
        
    }, [ref])

    return (
        <div id="game-container">
        </div>
    );

});

// Props definitions
PhaserGame.propTypes = {
    currentActiveScene: PropTypes.func 
}

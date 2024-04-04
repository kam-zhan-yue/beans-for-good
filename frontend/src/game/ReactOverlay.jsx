// ReactUIComponent.js

import React, { forwardRef } from 'react';

export const ReactOverlay = forwardRef(function ReactOverlay ({ currentActiveScene }, ref)
{
    const changeScene = () => {
      console.log("Change scene")
      const scene = ref.current.scene;

      if (scene)
      {
          scene.changeScene();
      }
    }

    return (
      <div style={overlayStyle}>
          <div>
              <div>
                  {/* <button className="button" onClick={changeScene}>Change Scene</button> */}
              </div>
          </div>
      </div>
    );
  });
  
  const overlayStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
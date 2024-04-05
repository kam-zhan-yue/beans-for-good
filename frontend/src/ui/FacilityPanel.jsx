import React, { forwardRef, useState, useImperativeHandle } from 'react';

export const FacilityPanel = forwardRef(function FacilityPanel ({ interactionOver }, ref)
{
  const [currentInteraction, setCurrentInteraction] = useState(null);

  const handleInteractionStart = (interaction) => {
      // Your logic to handle interaction start
      console.log(`Interaction started in FacilityPanel with ${interaction.facilityID} of type ${interaction.facilityType}`);
      setCurrentInteraction(interaction);
  };

  useImperativeHandle(ref, () => ({
    handleInteractionStart
  }));

  const handleInteraction = () => {
    console.log("Close")
    setCurrentInteraction(null);

    if(interactionOver instanceof(Function))
    {
      interactionOver();
    }
    
    // const scene = ref.current.scene;

    // if (scene)
    // {
    //     scene.changeScene();
    // }
  }

  return (
      <div style={overlayStyle}>
        {currentInteraction && <div>
          <button className="button" onClick={handleInteraction}>Change Scene</button>
          </div>}
      </div>
    );
  });
  
  const overlayStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
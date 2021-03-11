import React from "react";
import { useGameState } from "./state";

function Discarding() {
  const [gameState, dispatch] = useGameState();

  return (
    <div>
      {gameState.drawnPolicies.length === 1 &&
        `A ${gameState.drawnPolicies[0]} policy will be enacted!`}
      <>
        {gameState.drawnPolicies.map((card, index) => (
          <button
            key={`${card}-${index}`}
            onClick={() => {
              dispatch({
                type: "DISCARDED",
                payload: index,
              });
            }}
          >
            {card}
          </button>
        ))}
      </>
    </div>
  );
}

export default Discarding;

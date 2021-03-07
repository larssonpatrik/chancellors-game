import React from "react";
import { useGameState } from "./state";

function Turn() {
  const [gameState, dispatch] = useGameState();

  return (
    <div>
      We are in a turn!
      {JSON.stringify(gameState.enactedPolicies)}
      <br />
      <button
        onClick={() => {
          console.log("Yes was clicked");
        }}
      >
        Yes
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "SET_ELECTION_TRACKER",
            payload: gameState.electionTracker + 1,
          });
        }}
      >
        No
      </button>
      <br />
      Election tracker: {gameState.electionTracker}
    </div>
  );
}

export default Turn;

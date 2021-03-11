import React from "react";
import { useGameState } from "./state";

function Election() {
  const [gameState, dispatch] = useGameState();

  return (
    <div>
      We are in a turn!
      {JSON.stringify(gameState.enactedPolicies)}
      <br />
      <button
        onClick={() => {
          dispatch({
            type: "STARTED_DISCARDING",
          });
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

export default Election;

import React from "react";
import { useGameState } from "./state";

function Setup() {
  const [number, setNumber] = React.useState(4);
  const [, dispatch] = useGameState();

  return (
    <div>
      Selected number of players: {number}
      <input
        type="range"
        min={4}
        max={12}
        step={1}
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch({
            type: "SET_NUMBER_OF_PLAYERS",
            payload: number,
          });
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default Setup;

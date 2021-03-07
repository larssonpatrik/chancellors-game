import React from "react";
import { useGameState } from "./state";

const COLOR_MAP = {
  BLUE: { background: "blue", color: "white" },
  RED: { background: "red", color: "gray" },
  SUPREME: { background: "red", color: "white" },
};

function RoleShow() {
  const [turn, setTurn] = React.useState(0);
  const [reveal, setReveal] = React.useState(false);
  const [gameState, dispatch] = useGameState();

  const player = gameState.players[turn];

  return (
    <div>
      {gameState.players.length === turn ? (
        <>
          Sleep turn info to be written here!
          <br />
          <button
            onClick={() => {
              dispatch({
                type: "SET_READY",
                payload: true,
              });
            }}
          >
            We have slept, let's begin!
          </button>
        </>
      ) : (
        <>
          <button
            disabled={reveal}
            onClick={() => {
              setReveal(true);
            }}
          >
            Reveal
          </button>

          <div
            style={{
              background: reveal
                ? COLOR_MAP[player.identifier].background
                : "black",
              color: reveal ? COLOR_MAP[player.identifier].color : "black",
            }}
          >
            {player.identifier}
          </div>
          {reveal && (
            <>
              <input
                type="text"
                value={player.name}
                onChange={(e) => {
                  dispatch({
                    type: "SET_NAME",
                    payload: {
                      index: turn,
                      name: e.target.value,
                    },
                  });
                }}
              />
              <button
                disabled={!reveal || !player.name}
                onClick={() => {
                  setReveal(false);
                  setTurn((turn) => turn + 1);
                }}
              >
                I got it!
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default RoleShow;

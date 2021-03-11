import RoleShow from "./RoleShow";
import Setup from "./Setup";
import { useGameState } from "./state";
import Election from "./Election";
import Discarding from "./Discarding";

function App() {
  const [gameState] = useGameState();
  return (
    <div>
      {gameState.players.length === 0 ? (
        <Setup />
      ) : (
        <>
          {!gameState.ready ? (
            <RoleShow />
          ) : (
            <>
              {gameState.drawnPolicies.length > 0 ? (
                <Discarding />
              ) : (
                <>
                  {gameState.electionTracker < 3 ? (
                    <Election />
                  ) : (
                    "A policy has been enacted!"
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      <code style={{ display: "block", marginTop: "24px" }}>
        {JSON.stringify(gameState)}
      </code>
    </div>
  );
}

export default App;

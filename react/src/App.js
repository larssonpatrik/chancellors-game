import RoleShow from "./RoleShow";
import Setup from "./Setup";
import { useGameState } from "./state";
import Turn from "./Turn";

function App() {
  const [gameState] = useGameState();
  return (
    <div>
      {gameState.players.length === 0 ? (
        <Setup />
      ) : (
        <>{gameState.ready ? <Turn /> : <RoleShow />}</>
      )}
      <code style={{ display: "block", marginTop: "24px" }}>
        {JSON.stringify(gameState)}
      </code>
    </div>
  );
}

export default App;

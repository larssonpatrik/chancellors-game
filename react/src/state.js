import React from "react";

const PLAYER_POOL = [
  "BLUE",
  "SUPREME",
  "BLUE",
  "RED",
  "BLUE",
  "RED",
  "BLUE",
  "RED",
  "BLUE",
  "RED",
  "BLUE",
  "RED",
];

const POLICY_POOL = [
  "RED",
  "RED",
  "RED",
  "RED",
  "RED",
  "RED",
  "RED",
  "RED",
  "RED",
  "RED",
  "RED",
  "BLUE",
  "BLUE",
  "BLUE",
  "BLUE",
  "BLUE",
  "BLUE",
];

const defaultValue = {
  policyDeck: shuffle([...POLICY_POOL]),
  policyDiscardPile: [],
  drawnPolicies: [],
  players: [],
  ready: false,
  enactedPolicies: [],
  electionTracker: 0,
};
const GameState = React.createContext(defaultValue);

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const gameLogicReducer = (state, action) => {
  console.log("Reducer was called!", { state, action });
  switch (action.type) {
    case "SET_NUMBER_OF_PLAYERS": {
      const { payload: amountOfPlayers } = action;
      const listOfPlayers = PLAYER_POOL.slice(0, amountOfPlayers).map(
        (identifier) => {
          return {
            identifier,
            name: "",
          };
        }
      );
      shuffle(listOfPlayers);
      return { ...state, players: listOfPlayers };
    }
    case "SET_NAME": {
      const { index, name } = action.payload;
      const tmp = [...state.players];
      tmp[index] = {
        identifier: tmp[index].identifier,
        name,
      };
      return { ...state, players: tmp };
    }
    case "SET_READY": {
      const { payload: isReady } = action;
      return { ...state, ready: isReady };
    }
    case "SET_ELECTION_TRACKER": {
      const { payload: count } = action;
      const discardPile = [...state.policyDiscardPile];
      if (count >= 3) {
        if (discardPile.length === 0) {
          return { ...state, electionTracker: 0 };
        } else {
          const enactedPolicy = discardPile.pop();
          return {
            ...state,
            electionTracker: 0,
            policyDiscardPile: discardPile,
            enactedPolicies: [...state.enactedPolicies, enactedPolicy],
          };
        }
      }
      return { ...state, electionTracker: count };
    }
    case "STARTED_DISCARDING": {
      let pile = [...state.policyDeck];
      let discardPile = [...state.policyDiscardPile];
      if (pile.length < 3) {
        const leftoverCard = discardPile.shift();
        shuffle(discardPile);
        pile = [...pile, ...discardPile];
        discardPile = [leftoverCard];
      }
      const drawnPolicies = [pile.pop(), pile.pop(), pile.pop()];
      return {
        ...state,
        drawnPolicies,
        policyDeck: pile,
        policyDiscardPile: discardPile,
      };
    }
    case "DISCARDED": {
      const { payload: index } = action;
      const pickedCard = state.drawnPolicies[index];
      const drawnPolicies = state.drawnPolicies.filter((_, i) => i !== index);

      if (drawnPolicies.length === 0) {
        return {
          ...state,
          drawnPolicies,
          enactedPolicies: [...state.enactedPolicies, pickedCard],
        };
      }
      return {
        ...state,
        drawnPolicies,
        policyDiscardPile: [...state.policyDiscardPile, pickedCard],
      };
    }
    default:
      return state;
  }
};

export const GameStateProvider = ({ children }) => {
  const reducer = React.useReducer(gameLogicReducer, defaultValue);
  return <GameState.Provider value={reducer}>{children}</GameState.Provider>;
};

export const useGameState = () => {
  return React.useContext(GameState);
};

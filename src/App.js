import { useReducer } from "react";
import './App.css';
import { Slider } from "./Slider";

const initalState = {
  value: {
    width: 50,
    height: 50,
  },
  lockedState: false,
}

const actionType = {
  width: "handleWidthChange",
  height: "handleHeightChange",
  lockdState: "toggleLockedState"
}

const reducer = (state, action) => {
  const type = actionType[action.type];

  switch (type) {
    case "handleWidthChange": {
      const width = action.value;
      const height = state.lockedState
        ? Math.round(((state.value.height / state.value.width) * action.value))
        : state.value.height;
      return { ...state, value: { width, height }}
    }
    case "handleHeightChange": {
      const width = state.lockedState
        ? Math.round(((state.value.width / state.value.height) * action.value))
        : state.value.width;
      const height = action.value;
      return { ...state, value: { width, height }}
    }
    case "toggleLockedState": {
      return { ...state, lockedState: !state.lockedState }
    }
    default: {
      return { ...state }
    }
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <div className="container">
      <div className="inner">
        <div className="margin-bottom">
          <Slider
            type="width"
            value={state.value.width}
            inistalValue={initalState.value.width}
            dispatch={dispatch}
          />
        </div>
        <div className="margin-bottom">
          <Slider
            type="height"
            value={state.value.height}
            inistalValue={initalState.value.height}
            dispatch={dispatch}
          />
        </div>
        <div className="button">
          <button onClick={() => dispatch({type: "lockdState"})}>
            {state.lockedState ? "Lock" : "UnLock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

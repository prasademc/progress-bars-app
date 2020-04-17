import React from "react";
import { IState, IAction } from "./interfaces";

const initialState: IState = {
  progressBars: {
    bars: [],
    buttons: [],
    limit: 0,
  },
  selectedBar: 0,
  updateValue: 0,
};

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, progressBars: action.payload };
    case "INCREASE":
      return {
        ...state,
        updateValue: state.progressBars.bars.filter(
          (bar: number, index: number) => {
            if (index === state.selectedBar) {

              console.log("bar: ", bar = bar + action.updateValue);
              return bar = bar + action.updateValue;
            } else {
              return bar;
            }
          }
        ),
      };
    case "DECREASE":
      return {
        ...state,
        updateValue: state.progressBars.bars.filter(
          (bar: number, index: number) => {
            return index === state.selectedBar ? bar - action.updateValue : bar;
          }
        ),
      };
    case "SELECT_PROGRESS":
      return { ...state, selectedBar: action.selectedBar };
    default:
      return state;
  }
}

export const Store = React.createContext<IState | any>(initialState);

export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}

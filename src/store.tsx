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
        progressBars: {
          bars: state.progressBars.bars.map(
            (bar: number, index: number) => {
              if (index === state.selectedBar) {
                const total = bar + action.updateValue;
                return total > state.progressBars.limit ? state.progressBars.limit : total;
              } else {
                return bar;
              }
            }
          ),
          buttons: state.progressBars.buttons,
          limit: state.progressBars.limit
        }
      };
    case "DECREASE":
      return {
        ...state,
        progressBars: {
          bars: state.progressBars.bars.map(
            (bar: number, index: number) => {
              if (index === state.selectedBar) {
                const total = bar - action.updateValue;
                return total < 0 ? 0 : total;
              } else {
                return bar;
              }
            }
          ),
          buttons: state.progressBars.buttons,
          limit: state.progressBars.limit
        }
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

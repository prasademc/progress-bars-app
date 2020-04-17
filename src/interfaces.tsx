export interface IState {
  progressBars: {
    bars: Array<any>,
    buttons: Array<any>,
    limit: number
  },
  selectedBar: any,
  updateValue: any,
}

export interface IAction {
  type: string;
  payload: {
    bars: Array<any>,
    buttons: Array<any>,
    limit: number
  };
  selectedBar: any;
  updateValue: any;
}
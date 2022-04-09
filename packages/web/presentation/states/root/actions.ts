import { Action } from "react-sweet-state";
import { State } from "./initialState";

const actions = {
  setLoading:
    (loading: boolean): Action<State> =>
    ({ setState }) => {
      setState({ loading });
    },
};

export type Actions = typeof actions;

export default actions;

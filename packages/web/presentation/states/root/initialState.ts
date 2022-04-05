interface NewType {
  loading: boolean;
}

export type State = NewType;

const initialState = {
  loading: false,
  web3Object: null,
};

export default initialState;

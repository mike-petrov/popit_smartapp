type State = {
  popit: number;
};

type Action =
  | {
    type: "set_popit";
    popit: number;
  };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set_popit":
      return {
        ...state,
        popit: action.popit,
      };
    default:
      throw new Error();
  }
};

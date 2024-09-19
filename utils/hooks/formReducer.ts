import { formPayload} from "../../interfaces";


export const formReducer = (state:any , action:formPayload) => {
  switch (action.type) {
    case "HANDLE INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "EMPTY": {
      for (const key of Object.getOwnPropertyNames(state)) {
        state[key] = "";
      }
      return state;
    }
    default:
      return state;
  }
};

import { Dispatch } from "redux";
import { authAPI } from "../../api/cards-api";

const initialState = {
  isInitialized: false,
};

export type InitialStateType = typeof initialState;

export const profileReducer = (
  state: InitialStateType = initialState,
  action: SetInitializedActionType
): InitialStateType => {
  switch (action.type) {
    case "SET-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return { ...state };
  }
};

// actions
export const setInitializedAC = (value: boolean) =>
  ({ type: "SET-INITIALIZED", value } as const);

// thunks
export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
  console.log("loading");
  try {
    const res = await authAPI.me();
    if (res.data.data._id) {
      dispatch(setInitializedAC(true));
      console.log("get profile data");
    }
  } catch (e) {
    console.log("profile unauthorized");
  }
};

// types
type ActionsType = SetInitializedActionType;

export type SetInitializedActionType = ReturnType<typeof setInitializedAC>;

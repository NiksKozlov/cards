import { AxiosError } from "axios";
import { authAPI } from "../../api/cards-api";
import { AppThunkDispatch } from "../../app/store";
import { setIsLoggedInAC } from "../login/auth-reducer";

const profileInitialState = {
  _id: "",
  email: "",
  name: "",
  avatar: "",
  publicCardPacksCount: 0,
  created: "",
  updated: "",
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: "",
};

const initialState = {
  profile: profileInitialState,
};

type InitialStateType = typeof initialState;

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SET-PROFILE":
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};

// Actions
export const setProfileAC = (profile: any) =>
  ({ type: "SET-PROFILE", profile } as const);

// Thunks
export const meTC = () => (dispatch: AppThunkDispatch) => {
  authAPI
    .me()
    .then((res) => {
      dispatch(setIsLoggedInAC(true));
      dispatch(setProfileAC(res.data));
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message;
      console.log("error: ", error);
    });
};

export const logOutTC = () => (dispatch: AppThunkDispatch) => {
  authAPI
    .logOut()
    .then(() => {
      dispatch(setIsLoggedInAC(false));
    })
    .catch((err: AxiosError<{ error: string }>) => {
      const error = err.response ? err.response.data.error : err.message;
      console.log("error: ", error);
    });
};

type ActionsTypes = ReturnType<typeof setProfileAC>;

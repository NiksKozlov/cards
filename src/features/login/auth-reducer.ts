import { AxiosError } from "axios";

import { authAPI, LoginParamsType } from "../../api/cards-api";
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";
import { AppThunkDispatch } from "../../app/store";

const initialState = {
  isLoggedIn: false,
};

type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

export const loginTC =
  (data: LoginParamsType) => (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .login(data)
      .then((res) => {
        if (!res.data.error) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          dispatch(setAppErrorAC(res.data.error));
          dispatch(setAppStatusAC("failed"));
        }
      })
      .catch((err: AxiosError<{ error: string }>) => {
        const error = err.response ? err.response.data.error : err.message;

        console.log("error: ", error);
        dispatch(setAppStatusAC("failed"));
      });
  };

type ActionsTypes = ReturnType<typeof setIsLoggedInAC>;

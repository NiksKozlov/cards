import { authAPI } from "../../api/cards-api";
import { AppThunkDispatch } from "../../app/store";

export type setForgotPasswordErrorActionType = {
  type: "SET-ERROR";
  error: string;
};

export type sentMessageByEmailSuccessActionType = {
  type: "SENT-MESSAGE-BY-EMAIL-SUCCESS";
  isSent: boolean;
};

export type setForgotPasswordServerErrorActionType = {
  type: "SET-FORGOT-PASSWORD-SERVER-ERROR";
  serverError: null | string;
};

type ForgotPasswordActionsType =
  | setForgotPasswordErrorActionType
  | sentMessageByEmailSuccessActionType
  | setForgotPasswordServerErrorActionType;

type InitStateType = {
  isSent: boolean;
  error: string;
  serverError: null | string;
};

const initState: InitStateType = {
  isSent: false,
  error: "",
  serverError: null,
};

export const forgotPasswordReducer = (state = initState, action: ForgotPasswordActionsType): InitStateType => {
  switch (action.type) {
    case "SENT-MESSAGE-BY-EMAIL-SUCCESS":
      return { ...state, isSent: action.isSent };
    case "SET-ERROR":
      return { ...state, error: action.error };
    case "SET-FORGOT-PASSWORD-SERVER-ERROR":
      return { ...state, serverError: action.serverError };
    default:
      return state;
  }
};

export const setForgotPasswordError = (error: string): setForgotPasswordErrorActionType => ({
  type: "SET-ERROR",
  error,
});
export const sentMessageByEmailSuccess = (isSent: boolean): sentMessageByEmailSuccessActionType => ({
  type: "SENT-MESSAGE-BY-EMAIL-SUCCESS",
  isSent,
});
export const setForgotPasswordServerError = (serverError: null | string): setForgotPasswordServerErrorActionType => ({
  type: "SET-FORGOT-PASSWORD-SERVER-ERROR",
  serverError,
});

export const forgotPassword = (email: string) => async (dispatch: AppThunkDispatch) => {
  try {
    dispatch(sentMessageByEmailSuccess(false));
    const response = await authAPI.forgotPassword(email);

    if (response.data.error) {
      dispatch(setForgotPasswordError(response.data.error));
    } else {
      dispatch(setForgotPasswordError(""));
      dispatch(sentMessageByEmailSuccess(true));
    }
  } catch (err) {
    if (err instanceof Error) {
      dispatch(setForgotPasswordServerError(err.message));
    } else {
      dispatch(setForgotPasswordServerError(`Unexpected server error ${err}`));
    }
  }
};

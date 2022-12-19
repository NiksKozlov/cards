import React from "react";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { setForgotPasswordServerErrorActionType } from "../../features/forgot-password/forgotPassword-reducer";
import { setNewPasswordServerErrorActionType } from "../../features/new-password/newPassword-reducer";
import { setRegisterServerError, setRegisterServerErrorActionType } from "../../features/register/register-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ErrorSnackbarPropsType = {
  serverError: string | null;
  setServerErrorAction: (
    serverError: null | string
  ) => setNewPasswordServerErrorActionType | setRegisterServerErrorActionType | setForgotPasswordServerErrorActionType;
};

export function ErrorSnackbar({ serverError, setServerErrorAction }: ErrorSnackbarPropsType) {
  console.log(serverError);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setServerErrorAction(null));
  };

  const isOpen = serverError !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {serverError}
      </Alert>
    </Snackbar>
  );
}

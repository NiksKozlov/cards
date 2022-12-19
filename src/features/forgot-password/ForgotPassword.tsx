import React, { useState } from "react";

import { FormGroup, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Navigate, NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { ErrorSnackbar } from "../../components/ErrorSnackbar/ErrorSnackbar";

import { forgotPassword, setForgotPasswordServerError } from "./forgotPassword-reducer";
import s from "./ForgotPassword.module.css";

type FormikErrorsType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const isSent = useAppSelector((st) => st.forgotPassword.isSent);
  const error = useAppSelector((st) => st.forgotPassword.error);
  const serverError = useAppSelector((st) => st.forgotPassword.serverError);

  if (isSent) {
    return <Navigate to={"/check-email"} />;
  }

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorsType = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(forgotPassword(values.email));
    },
  });

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <ErrorSnackbar serverError={serverError} setServerErrorAction={setForgotPasswordServerError} />
        <h1>Forgot your password?</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup sx={{ width: "350px" }}>
            <TextField
              InputLabelProps={{ className: s.textfieldLabel }}
              inputProps={{ className: s.textfieldMain }}
              variant="standard"
              label="Email"
              margin="normal"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={!!formik.errors.email}
            />
            {formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}
            {error ? <div className={s.error}>{error}</div> : null}
            <span className={s.instruction}>Enter your email address and we will send you further instructions?</span>
            <button className={s.submitBtn} type={"submit"} color={"primary"}>
              Send Instructions
            </button>
          </FormGroup>
        </form>
        <span>Do you remember your password?</span>
        <NavLink to={"/login"} className={s.tryLoginBtn}>
          Try loggining in
        </NavLink>
      </div>
    </div>
  );
};

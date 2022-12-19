import React, { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormGroup, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Navigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { ErrorSnackbar } from "../../components/ErrorSnackbar/ErrorSnackbar";

import { createNewPassword, setNewPasswordServerError } from "./newPassword-reducer";
import s from "./NewPassword.module.css";

type FormikErrorsType = {
  password?: string;
};

export const NewPassword = () => {
  const dispatch = useAppDispatch();

  const { token } = useParams<{ token: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const isCreateNewPassword = useAppSelector((st) => st.newPassword.isCreateNewPassword);
  const error = useAppSelector((st) => st.newPassword.error);
  const serverError = useAppSelector((st) => st.newPassword.serverError);

  if (isCreateNewPassword) {
    return <Navigate to={"/login"} />;
  }

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorsType = {};

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length > 20) {
        errors.password = "Must be 20 characters or less";
      } else if (values.password.length < 5) {
        errors.password = "Must be at least 5 characters";
      }

      return errors;
    },
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      dispatch(createNewPassword(values.password, token as string));
    },
  });

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <ErrorSnackbar serverError={serverError} setServerErrorAction={setNewPasswordServerError} />
        <h1>Create new password</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup sx={{ width: "350px" }}>
            <TextField
              InputLabelProps={{ className: s.textfieldLabel }}
              inputProps={{ className: s.textfieldMain }}
              type={showPassword ? "text" : "password"}
              variant="standard"
              label="Password"
              margin="normal"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={!!formik.errors.password}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {formik.errors.password ? <div className={s.error}>{formik.errors.password}</div> : null}
            {error ? <div className={s.error}>{error}</div> : null}
            <span className={s.instruction}>Create new password and we will send you futherinstructions to email</span>
            <button className={s.submitBtn} type={"submit"} color={"primary"}>
              Create new password
            </button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};

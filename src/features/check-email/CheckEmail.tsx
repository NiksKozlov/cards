import React from "react";

import { Navigate, NavLink, useNavigate } from "react-router-dom";

import { ErrorSnackbar } from "../../components/ErrorSnackbar/ErrorSnackbar";

import s from "./CheckEmail.module.css";

export const CheckEmail = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <h1>Check Email</h1>
        <img style={{ width: "130px", height: "130px", backgroundColor: "palegoldenrod" }} />
        <span className={s.instruction}>{`We've sent an Email with instructions to example@mail.com`}</span>
        <button className={s.submitBtn} onClick={navigateToLogin}>
          Back to login
        </button>
      </div>
    </div>
  );
};

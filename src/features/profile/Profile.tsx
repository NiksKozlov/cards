import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Navigate } from "react-router-dom";
import s from "./Profile.module.css";
import { logOutTC, meTC } from "./profile-reducer";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const profile = useAppSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  const logOut = () => {
    dispatch(logOutTC());
  };

  return (
    <div className={s.mainContainer}>
      <div className={s.formContainer}>
        <h1>Personal information</h1>
        <div>
          <img
            style={{ height: "100px" }}
            src="https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
            alt="profile photo"
          />
        </div>
        <h4>{profile.name}</h4>
        <h5>{profile.email}</h5>
        <button className={s.submitBtn} onClick={logOut}>
          LogOut
        </button>
      </div>
    </div>
  );
};

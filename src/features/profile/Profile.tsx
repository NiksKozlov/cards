import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { Navigate } from "react-router-dom";
import { meTC } from "./profile-reducer";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.profile.isInitialized);

  useEffect(() => {
    dispatch(meTC());
  }, []);

  if (!isInitialized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Personal information</h3>
      <div>
        <img
          style={{ height: "100px" }}
          src="https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
          alt="profile photo"
        />
      </div>
      <h4>Name</h4>
      <h5>Email@gmail.com</h5>
      <button>Logout</button>
    </div>
  );
};

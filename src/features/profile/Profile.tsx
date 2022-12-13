import React from "react";

export const Profile = () => {
  return (
    <div>
      <h3>Personal information</h3>
      <div>
        <img
          style={{ height: "100px" }}
          src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg"
          alt="profile photo"
        />
      </div>
      <div>Name</div>
      <div>Email</div>
      <button>Logout</button>
    </div>
  );
};

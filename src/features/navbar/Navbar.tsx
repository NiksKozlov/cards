import React from "react";

import s from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={s.navbarContainer}>
      <div>image</div>
      <button className={s.navBtn} type={"submit"} color={"primary"}>
        Sign in
      </button>
    </div>
  );
};

import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "./auth";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to={"/"}>Goal</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to={"/login"}>
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <FaUser />
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={onLogout} className="btn">
              <FaSignOutAlt />
              Log out
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;

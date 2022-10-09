import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "./auth";
import Spinner from "./Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, hasError, hasSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (hasError) {
      toast.error(message);
    }

    if (hasSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, hasError, hasSuccess, message, navigate, dispatch]);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to your account.</p>
      </section>
      <section className="form">
        <form action="#" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email.."
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password.."
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "./auth";
import Spinner from "./Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

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

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password should match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account</p>
      </section>
      <section className="form">
        <form action="#" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name.."
            />
          </div>
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
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm your password.."
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

export default Register;

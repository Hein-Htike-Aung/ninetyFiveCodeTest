import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import "./librarian_login.scss";
import { useForm } from "react-hook-form";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/auth_context";
import ContainedButton from "../../../components/form/contained-button/ContainedButton";
import { useNavigate } from "react-router";

const LibrarianLogin = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (formValues) => {
    try {
      await login(formValues);
      navigate("/librarian-user/borrow-list");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="librarianLogin">
      <div className="loginCard">
        <div className="loginCardWrapper">
          <h3>Librarian Login</h3>
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
              placeholder="Email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              error={errors.email ? true : false}
              {...register("email", {
                required: "email is required",
              })}
            />
            <TextField
              type={"password"}
              placeholder="Password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              error={errors.password ? true : false}
              {...register("password", {
                required: "password is required",
              })}
            />
            <div className="loginCardFooter">
              <ContainedButton
                title={"Login"}
                height={2.5}
                width={100}
                btnClick={() => {}}
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LibrarianLogin;

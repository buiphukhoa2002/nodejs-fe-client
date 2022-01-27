import { Button, Input } from "antd";
import React, { useCallback } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import "./SignIn.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  loginWithFacebookThunk,
  signInThunk,
} from "../../Redux/Thunks/userThunk";
import { useTranslation } from "react-i18next";
import FacebookLogin from "react-facebook-login";

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const { values, touched, errors, handleChange, handleBlur } = formik;

  const setAllTouched = useCallback(() => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key);
    });
  }, [formik]);

  const goToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllTouched();
    if (formik.isValid) {
      dispatch(signInThunk(formik.values, goToHome));
    }
  };

  const responseFacebook = (response) => {
    dispatch(loginWithFacebookThunk(response.accessToken, goToHome));
  };

  return (
    <div className="container">
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3>{t("signin_text")}</h3>
        <Input
          name="email"
          size="large"
          placeholder={t("profile_username")}
          prefix={<UserOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
        />
        <div className="text-danger mt-1 text-left w-50">
          {touched.email ? errors.email : ""}
        </div>
        <Input.Password
          name="password"
          size="large"
          placeholder={t("signup_password")}
          type="password"
          prefix={<LockOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          autoComplete="on"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <div className="text-danger mt-1 text-left w-50">
          {touched.password ? errors.password : ""}
        </div>
        <p className="text-right mt-1 w-50 forgot__password">
          {t("signin_forgot_password")}?
        </p>
        <Button
          type="primary"
          className="mt-1 w-50 btnSignIn"
          onClick={handleSubmit}
        >
          {t("signin")}
        </Button>

        <div className="mt-5"></div>
        <FacebookLogin
          appId="633132611165446"
          autoLoad={true}
          fields="name,email,picture"
          onClick={() => {}}
          callback={responseFacebook}
        />

        <p className="text-left mt-5 w-50">
          {t("signin_dont_have_an_account")}?{" "}
          <NavLink to="/signup">{t("signup")}</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

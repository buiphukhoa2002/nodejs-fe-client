import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserLoginThunk,
  updateUserAvatarThunk,
  updateUserPasswordThunk,
  updateUserThunk,
} from "../../Redux/Thunks/userThunk";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, Tag, Table, Button } from "antd";
import dayjs from "dayjs";
import bcryptjs from "bcryptjs";
import { openNotification } from "../../Util/Notification/Notification";
import {
  getTicketListByUserThunk,
  printTicketThunk,
} from "../../Redux/Thunks/ticketThunk";
import axios from "axios";
import { saveAs } from "file-saver";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .typeError("Please enter a valid number"),
  name: yup.string().required("Please enter your name"),
});

const Profile = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      <section id="new-in" className="container">
        <div id="time">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#profileinfo"
              >
                {t("profile_account_info")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#profileticket">
                {t("profile_purchase_history")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#profile_change_password"
              >
                {t("profile_change_password")}
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane container active" id="profileinfo">
            <div id="dangchieu">
              <div className="row">
                <div className="col-12 col-md-6">
                  <AccountInformation t={t} />
                </div>
                <div className="col-12 col-md-6">
                  <UpdateAvatar t={t} />
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane container" id="profileticket">
            <Ticket t={t} />
          </div>
          <div className="tab-pane container" id="profile_change_password">
            <ChangePassword t={t} />
          </div>
        </div>
      </section>
    </div>
  );
};

const AccountInformation = ({ t }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user ? user.id : "",
      name: user ? user.name : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const setAllTouched = useCallback(() => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key);
    });
  }, [formik]);

  const updateUser = (e) => {
    e.preventDefault();
    setAllTouched();
    if (formik.isValid) {
      dispatch(updateUserThunk(formik.values));
    }
  };

  return (
    <form className="container">
      <div className="form-group">
        <h6 className="font-weight-bold">{t("profile_fullname")}</h6>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="text-danger mt-1 text-left w-50">
          {formik.touched.name ? formik.errors.name : ""}
        </div>
      </div>
      <div className="form-group">
        <h6 className="font-weight-bold">Email</h6>
        <input
          type="text"
          name="email"
          className="form-control"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="text-danger mt-1 text-left w-50">
          {formik.touched.email ? formik.errors.email : ""}
        </div>
      </div>
      <div className="form-group">
        <h6 className="font-weight-bold">{t("profile_soDt")}</h6>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="text-danger mt-1 text-left w-50">
          {formik.touched.phone ? formik.errors.phone : ""}
        </div>
      </div>
      <button className="btn btn-success" onClick={updateUser}>
        {t("profile_save_info")}
      </button>
    </form>
  );
};

const ChangePassword = ({ t }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onFieldChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const updatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = password;
    if (!user) return;
    const match = bcryptjs.compareSync(currentPassword, user.password);
    if (!match) {
      openNotification("error", "Error", "Your current password is incorrect");
      return;
    }
    if (newPassword !== confirmPassword) {
      openNotification(
        "error",
        "Error",
        "Passwords did not match. Please try again"
      );
      return;
    }
    if (newPassword === "") {
      openNotification("error", "Error", "Password must not be empty");
      return;
    }
    const newUser = { ...user, password: newPassword };
    dispatch(updateUserPasswordThunk(newUser));
  };

  return (
    <form className="container">
      <div className="form-group">
        <p className="font-weight-bold">{t("profile_current_password")}</p>
        <Input.Password
          type="password"
          className="form-control"
          name="currentPassword"
          autoComplete="on"
          onChange={onFieldChange}
        />
      </div>
      <div className="form-group">
        <p className="font-weight-bold">{t("profile_new_password")}</p>
        <Input.Password
          type="password"
          className="form-control"
          name="newPassword"
          autoComplete="on"
          onChange={onFieldChange}
        />
      </div>
      <div className="form-group">
        <p className="font-weight-bold">{t("profile_confirm_password")}</p>
        <Input.Password
          type="password"
          className="form-control"
          name="confirmPassword"
          autoComplete="on"
          onChange={onFieldChange}
        />
      </div>
      <Button type="primary" onClick={updatePassword}>
        {t("profile_change_password")}
      </Button>
    </form>
  );
};

const UpdateAvatar = ({ t }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [avatar, setAvatar] = useState("");

  const onAvatarSave = () => {
    if (!user) return;
    if (avatar === "") {
      alert("Please upload a file");
    }
    const formData = new FormData();
    formData.append("avatar", avatar);

    const payload = {
      id: user.id,
      data: formData,
    };

    dispatch(updateUserAvatarThunk(payload));
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7">
            <h6 className="font-weight-bold">{t("profile_current_avatar")}</h6>

            <img
              src={
                user && user.avatar
                  ? user.avatar
                  : "https://huyhoanhotel.com/wp-content/uploads/2016/05/765-default-avatar.png"
              }
              alt="Avatar user"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-12 col-md-5 form-group">
            <div>
              <h6 className="font-weight-bold">
                {t("profile_upload_new_avatar")}
              </h6>

              <br></br>
              <p></p>
              <input
                type="file"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                }}
              />
            </div>
            <button className="btn btn-success mt-3" onClick={onAvatarSave}>
              {t("profile_save_new_avatar")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Ticket = ({ t }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) {
      dispatch(getTicketListByUserThunk(user.id));
    }
  }, [user, dispatch]);

  const { ticketList } = useSelector((state) => state.ticketReducer);

  const printTicket = (showtimeId) => {
    if (!user) return;
    axios({
      method: "POST",
      url: "http://localhost:8000/api/v1/ticket/print_ticket",
      data: {
        userId: user.id,
        showtimeId,
      },
      responseType: "blob",
    }).then((res) => {
      const pdfBlob = new Blob([res.data], { type: "application/pdf" });

      saveAs(pdfBlob, "ticket.pdf");
    });
  };

  const columns = [
    {
      title: t("profile_ticket_showtimeId"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("profile_ticket_movie"),
      render: (text, record, index) => {
        const movie = record.Movie;
        return (
          <div>
            <img
              src={movie.poster}
              alt="poster"
              style={{ height: 50, width: 50, marginRight: 10 }}
            />
            {movie.name}
          </div>
        );
      },
    },
    {
      title: t("profile_ticket_cinema"),
      render: (text, record, index) => {
        const cinemaRoom = record.CinemaRoom;
        return (
          <div>
            {cinemaRoom.Cinema.name} (Room {cinemaRoom.name})
          </div>
        );
      },
    },
    {
      title: t("profile_ticket_time"),
      render: (text, record, index) => {
        return <div>{dayjs(record.startTime).format("HH:mm DD/MM/YYYY")}</div>;
      },
    },
    {
      title: t("profile_ticket_seats"),
      render: (text, record, index) => {
        return record.Seats.map((seat) => <Tag>{seat.name} </Tag>);
      },
    },
    {
      title: t("profile_ticket_print_ticket"),
      render: (text, record, index) => {
        return (
          <button
            className="btn btn-success"
            onClick={() => printTicket(record.id)}
          >
            {t("profile_ticket_print")}
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <Table dataSource={ticketList} columns={columns} rowKey={"id"} />;
    </div>
  );
};

export default Profile;

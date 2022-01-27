import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageKeys } from "../Util/constants/systemConstant";

const AuthTemplate = ({ children }) => {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (localStorage.getItem(localStorageKeys.ACCESS_TOKEN)) {
      navigate(-1);
    }
  }, []);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row">
        <div
          className="col-12 col-md-6"
          style={{
            paddingLeft: 0,
            display: window.innerWidth < 800 ? "none" : "flex",
          }}
        >
          <img
            src="https://i.picsum.photos/id/1056/3988/2720.jpg?hmac=qX6hO_75zxeYI7C-1TOspJ0_bRDbYInBwYeoy_z_h08"
            alt=""
            style={{ width: "100%", height: "100vh" }}
          />
        </div>
        <div className="col-12 col-md-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthTemplate;

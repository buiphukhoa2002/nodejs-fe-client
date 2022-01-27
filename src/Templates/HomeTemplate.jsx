import React, { useEffect } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

import { useNavigate } from "react-router-dom";
import { localStorageKeys } from "../Util/constants/systemConstant";

const HomeTemplate = ({ children }) => {
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!localStorage.getItem(localStorageKeys.ACCESS_TOKEN)) {
      navigate("./signin");
    }
  }, []);

  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default HomeTemplate;

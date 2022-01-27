import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCinemaSystemListThunk } from "../../Redux/Thunks/cinemaSystemThunk";
import "./CinemaSystem.css";

const CinemaSystem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getCinemaSystemListThunk);
  }, [dispatch]);

  const { cinemaSystemList } = useSelector(
    (state) => state.cinemaSystemReducer
  );

  return (
    <div className="container">
      <h2 className="text-center mt-5">{t("cinema_system_choose")}</h2>
      <div className="row">
        {cinemaSystemList.map((system) => {
          return (
            <div
              key={system.id}
              className="col-6 mt-4 cinema_system"
              onClick={() => navigate(`/cinema/${system.id}`)}
            >
              <div className="row">
                <div className="col-2">
                  <img
                    src={system.logo}
                    alt="Cinema"
                    style={{ width: 75, height: "auto" }}
                  />
                </div>
                <div className="col-10">
                  <h4 className="mt-2">
                    <b>{system.name}</b>
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CinemaSystem;

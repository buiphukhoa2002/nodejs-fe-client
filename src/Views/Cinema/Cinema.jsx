import { Breadcrumb } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCinemaSystemDetailThunk } from "../../Redux/Thunks/cinemaSystemThunk";

const Cinema = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCinemaSystemDetailThunk(id));
  }, [dispatch]);

  const { cinemaSystemDetail } = useSelector(
    (state) => state.cinemaSystemReducer
  );

  return (
    <div className="container">
      <div className="mt-4"></div>
      <Breadcrumb style={{ fontSize: 20 }}>
        <Breadcrumb.Item
          onClick={() => navigate("/cinema_system")}
          style={{ cursor: "pointer" }}
        >
          {t("cinema_system")}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {cinemaSystemDetail ? cinemaSystemDetail.name : ""}'s Cinemas
        </Breadcrumb.Item>
      </Breadcrumb>

      {window.innerWidth > 800 && (
        <div className="row mt-5">
          <h5 className="col-4 text-center">{t("cinema")}</h5>
          <h5 className="col-8 text-center">
            {t("cinema_address").toUpperCase()}
          </h5>
        </div>
      )}

      {cinemaSystemDetail?.Cinemas.map((cinema) => {
        return (
          <div
            className="cinema_system"
            style={{
              border: "1px solid rgba(0,0,0,0.1)",
              margin: 10,
              fontSize: 20,
            }}
            onClick={() => navigate(`/showtime?csid=${id}&cid=${cinema.id}`)}
          >
            <div className="row">
              <div className="col-4">{cinema.name}</div>
              <div className="col-8" style={{ fontSize: 15 }}>
                {cinema.address}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cinema;

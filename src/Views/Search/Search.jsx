import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getMoviesThunk } from "../../Redux/Thunks/movieThunk";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMoviesThunk);
  }, [dispatch]);

  const movieList = useSelector((state) => state.movieReducer.movieList);
  const keyWord = useParams().keyword.toLowerCase();
  const { t } = useTranslation();

  const columns = [
    {
      title: t("search_film_name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("search_film_img"),
      render: (text, record, index) => {
        return (
          <img
            src={record.poster}
            width="100"
            height="100"
            alt="Film imgg"
          ></img>
        );
      },
    },
    {
      title: "",
      render: (text, record, index) => {
        return (
          <button
            className="btn btn-success"
            onClick={() => {
              navigate(`/detail/${record.id}`);
            }}
          >
            {t("book_tickets")}
          </button>
        );
      },
    },
  ];

  return (
    <div className="container mt-2">
      <Table
        dataSource={movieList.filter((movie) =>
          movie.name.toLowerCase().includes(keyWord)
        )}
        columns={columns}
        rowKey={"id"}
      />
    </div>
  );
};

export default Search;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookTicketTemplate = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  return <div>{children}</div>;
};

export default BookTicketTemplate;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const isLogin = useSelector((state) => state.auth.isLogin);

  if (!isLogin) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
}

export default Protected;

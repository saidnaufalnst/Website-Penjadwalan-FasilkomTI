import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
  const role = localStorage.getItem('role');
  const isAuthenticated = localStorage.getItem('token');
  
  if (isAuthenticated){
    if (role !== "1" && role === "2") return <Navigate to={"/page/user/home"}/>;
  } else if (!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  return props.children;
};

export default PrivateRoute;

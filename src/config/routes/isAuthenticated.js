import { Navigate } from 'react-router-dom';

const IsAuthenticated = (props) => {
    const token = localStorage.getItem('token');
  
    if (!token) return <Navigate to={"/"}/>;

  return props.children;
};

export default IsAuthenticated;

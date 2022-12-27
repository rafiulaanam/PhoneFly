import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../Context/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()

if(loading){
    return <Spinner></Spinner>
}

    if(user && user?.uid){
        return children;
    }
    else{
        <Navigate to='/login' state={{from:location}} replace></Navigate> ;
    }
};

export default PrivateRoute;
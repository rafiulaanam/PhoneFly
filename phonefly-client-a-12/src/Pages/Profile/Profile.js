import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import userPhoto from "../../Assets/img/user.png"
import { MdEdit } from 'react-icons/md';

const Profile = () => {
    const {user}=useContext(AuthContext)
    return (
        <div className='h-screen'>
            <div className="avatar m-20 items-center">
  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src={user?.photoURL ? user?.photoURL : userPhoto} alt='Profile Pic'/>
    <span className='absolute top-9 right-0 left-20 bottom-0 text-4xl'><MdEdit></MdEdit></span>
  </div>
    <span>
    <p className='ml-8 text-2xl font-bold'>Name: {user?.displayName}</p>
<p className='ml-8 text-2xl font-bold'>Email: {user?.email}</p>
    </span>
</div>
        </div>
    );
};

export default Profile;
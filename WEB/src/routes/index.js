import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import ChangePassword from '../screens/ChangePassword';

const Router = () => {
    const token = useSelector((state) => state.user.token);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                {token !== "" && token !== undefined &&
                    <>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/profile/changePassword' element={<ChangePassword/>}/>
                    </>
                }
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
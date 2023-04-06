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
import Service from '../screens/Service';

const Router = () => {
    const token = useSelector((state) => state.user.token);
    const isAdmin = useSelector((state) => state.user.isAdmin);

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
                        {isAdmin !== "" && isAdmin !== undefined &&
                            <>
                                <Route path='/service' element={<Service/>}/>
                            </>
                        }
                    </>
                }
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
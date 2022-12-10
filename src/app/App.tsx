import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {Profile} from '../features/Profile/Profile';
import {Register} from '../features/Register/Register';
import {ResetPassword} from '../features/Password/ResetPassword';
import {NewPassword} from '../features/Password/NewPassword';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<Profile />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
                <Route path={'/reset-password'} element={<ResetPassword />} />
                <Route path={'/new-password'} element={<NewPassword />} />
                <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>} />
                <Route path={'*'} element={<Navigate to={'/404'} />} />
            </Routes>
        </div>
    );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.user.token);

    function handleClickLogin() {
        navigate("/login");
    }

    function handleClickProfile() {
        navigate("/profile");
    }

    function getMessageBasedOnTime() {
        const now = new Date();
        const hour = now.getHours();
      
        if (hour >= 6 && hour < 13) {
          return "Bonjour";
        } else if (hour >= 13 && hour < 18) {
          return "Bon après-midi";
        } else {
          return "Bonsoir";
        }
      }

    function showMenu() {
        if (token === "" || token === undefined) {
            return <div className="menuBarLogin">
                <button onClick={handleClickLogin} className="menuBarLoginButton">Connexion</button>
            </div>
        } else {
            return <div className="menuBarLogin">
                <button onClick={handleClickProfile} className="menuBarLoginButton">{getMessageBasedOnTime()}, {user.name}</button>
            </div>
        }
    }

    return (
        <div className="menuBar">
            <Link to={"/"} className="titleSite">StatusPage - Bysimeit</Link>
            {showMenu()}
        </div>
    );
}
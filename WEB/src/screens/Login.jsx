import React, { useState } from 'react';
import MenuBar from "../components/MenuBar";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAxios } from '../api/user';
import { getUser } from '../api/client';
import { login, setToken } from '../store/userSlicer';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function processLogin() {
        if (email !== "") {
            if (password !== "") {
                const newToken = await loginAxios(email, password);
                const data = await getUser(email, newToken);
                alert("Connexion réussie !");
                dispatch(setToken(newToken));
                dispatch(login(data[0]));     
                navigate("/profile");
            } else {
                alert("Le champ mot de passe n'est pas rempli !");
            }
        } else {
            alert("Le champ eMail n'est pas rempli !");
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        processLogin().catch(e => alert(e.message));
    }
 
    return(
        <div>
            <MenuBar/>
            <div className="mainLogin">
                <form className="loginForm">
                    <p className='loginFormTitle'>Connexion</p>
                    <div>
                        <label htmlFor="mail">EMail :</label>
                        <input type="email" id="mail" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="loginButton">
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Connexion</button>
                    </div>
                </form>
                <div className='signUpButton'>
                    <Link to={"/signup"}>
                        <button className="orangeButton">Inscription</button>
                    </Link>
                </div>
            </div> 
        </div>
    );
}
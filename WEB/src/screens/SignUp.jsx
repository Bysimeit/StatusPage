import React, { useState } from 'react';
import MenuBar from "../components/MenuBar";
import { postNewUser } from '../api/client';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    async function processSignUp() {
        if (name !== "") {
            if (email !== "") {
                // eslint-disable-next-line
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
                if (reg.test(email)) {
                    if (password !== "") {
                        if (passwordConfirm !== "") {
                            if (password === passwordConfirm) {
                                await postNewUser(name, password, email);
                                alert("Le compte a été crée avec succès !");
                                navigate("/login");
                            } else {
                                alert("Les mots de passe doivent correspondrent !");
                            }
                        } else {
                            alert("Le champ confirmer mot de passe n'est pas rempli !");
                        }
                    } else {
                        alert("Le champ mot de passe n'est pas rempli !");
                    }
                } else {
                    alert("Le champ eMail n'est pas au bon format !");
                }
            } else {
                alert("Le champ eMail n'est pas rempli !");
            }
        } else {
            alert("Le champ nom n'est pas rempli !");
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        processSignUp().catch(e => alert(e.message));
    }

    return(
        <div>
            <MenuBar/>
            <div className="mainLogin">
                <form className="loginForm">
                    <p className='loginFormTitle'>Inscription</p>
                    <div>
                        <label htmlFor="password">Nom :</label>
                        <input type="text" id="password" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="mail">EMail :</label>
                        <input type="email" id="mail" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">Confirmer mot de passe :</label>
                        <input type="password" id="password" onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>
                    <div className="loginButton">
                        <button type="submit" onClick={(e) => handleSubmit(e)}>S'inscrire</button>
                    </div>
                </form>
            </div> 
        </div>
    );
}
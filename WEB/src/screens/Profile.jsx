import React from 'react';
import MenuBar from "../components/MenuBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../store/userSlicer';
import { deleteUser } from '../api/client';

export default function Profile(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    function handleChangePassword(){
        navigate("/profile/changePassword");
    }

    async function handleDeleteAccount(){
        const confirmDelete = window.prompt('Êtes-vous sûr de supprimer votre compte ? \nÉcrivrez "delete" pour confirmer.');
        if (confirmDelete === 'delete') {
            await deleteUser(user.id, user.token);
            dispatch(setToken(""));
            localStorage.removeItem('token');
            alert("Compte supprimé avec succès !");
            navigate("/login");
        }
    }

    function handleLogout(){
        dispatch(setToken(""));
        localStorage.removeItem('token');
        alert("Vous êtes déconnecté !");
        navigate("/login");
    }

    function handleManageServicesClick() {

    }

    function isAdmin() {
        if (user.isAdmin) {
            return (
                <div className="adminPanel">
                    <h3>Panel administrateur</h3>
                    <button className='adminButton' onClick={handleManageServicesClick}>Gérer les services</button>
                </div>
            );
        }
    }

    return(
        <div>
            <MenuBar/>
            <div className="mainLogin">
                <div className="profileTitle">
                    <p>Bienvenue {user.name} !</p>
                    <p>Adresse mail : {user.email}</p>
                </div>
                {isAdmin()}
                <div className="profileButtons">
                    <button className="changePasswordButton" onClick={handleChangePassword}>Changer le mot de passe</button>
                    <button className="deleteAccountButton" onClick={handleDeleteAccount}>Supprimer le compte</button>
                    <button className="logoutButton" onClick={handleLogout}>Se déconnecter</button>
                </div>
            </div> 
        </div>
    );
}

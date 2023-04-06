import React, { useState } from 'react';
import MenuBar from '../components/MenuBar';
import { updateEmailPasswordUser } from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ChangePassword() {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const user = useSelector((state) => state.user);

    async function handlePasswordChange() {
        if (newPassword !== '' && confirmNewPassword !== '' && newPassword === confirmNewPassword) {
            await updateEmailPasswordUser(currentPassword, newPassword, user.email, undefined, user.token);
            alert('Le mot de passe a été modifié avec succès !');
            navigate('/profile');
        } else {
            alert("Les nouveaux mots de passe ne correspondent pas ou ne sont pas remplis !");
        }
    }

    return (
        <div>
        <MenuBar />
        <div className="mainLogin">
            <form className="loginForm">
            <p className="loginFormTitle">Changement de mot de passe</p>
            <div>
                <label htmlFor="currentPassword">Mot de passe actuel :</label>
                <input type="password" id="currentPassword" onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor="newPassword">Nouveau mot de passe :</label>
                <input type="password" id="newPassword" onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor="confirmNewPassword">Confirmer le nouveau mot de passe :</label>
                <input type="password" id="confirmNewPassword" onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
            <div className="loginButton">
                <button type="button" className='changePasswordButtonLeft' onClick={() => navigate('/profile')}>Retour</button>
                <button type="button" onClick={handlePasswordChange}>Modifier le mot de passe</button>
            </div>
            </form>
        </div>
        </div>
    );
}

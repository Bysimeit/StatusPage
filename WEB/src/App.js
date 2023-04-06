import React, { useEffect } from 'react';
import Router from './routes';
import { useDispatch } from 'react-redux';
import { verifTokenAxios } from './api/user';
import { login, setToken } from './store/userSlicer';
import './App.css';

function App() {
  const dispatch = useDispatch(); 

  useEffect(() => {
    let token = localStorage.getItem('token');
    
    if (token !== null && token !== undefined) {
      refreshPage(token); 
    }  
  }, []);

  async function refreshPage(token) {  
    let response = await verifTokenAxios(token);
    
    if(response.status === 200) {
      dispatch(setToken(token));
      dispatch(login(response.data[0]));     
    } else {
      localStorage.removeItem('token');
    }
  }

  return (
    <div>
      <Router/>
    </div>
  );
}

export default App;

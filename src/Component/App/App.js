import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Dashboard  from '../Dashboard/Dashboard';
import './App.css';

const { SetCookie, DeleteCookie, hasCookie } = require('../../Utility/CookieManager.js');
const CLIENT_ID = "502611908597-rin137ucmqtviasmdloau5s0cuhe7hhl.apps.googleusercontent.com";/*process.env.REACT_APP_CLIENT_ID*/

const App = () => { 
  const [user, setUser] = useState({ haslogin: false, accessToken: '' });

  useEffect(() => {
    const cookieObject = hasCookie();
    if (cookieObject.haslogin) {
      setUser({
        ...cookieObject
      });
    }
  }, []);
  function login(response) {
    if (response.vc.access_token) {
      setUser({
        ...response.profileObj,
        haslogin: true,
        accessToken: response.vc.access_token
      })
    }
    SetCookie({
      ...response.profileObj,
      accessToken: response.vc.access_token
    });
  }

  function logout(response) {
    setUser({ haslogin: false, accessToken: '' });
    DeleteCookie(['accessToken', 'email', 'givenName', 'familyName', 'imageUrl', 'name', 'googleId']);
  }

  function handleLoginFailure(response) {
    alert('Failed to log in')
  }
  function handleLogoutFailure(response) {
    alert('Failed to log out')
  }
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" style={{backgroundColor: '#ffffff'}}>
        <Navbar.Brand href="#home" style={{color: '#000000'}}>SEMIN watch</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          {user.haslogin ?
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText='Logout'
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            >
            </GoogleLogout> : <GoogleLogin
              clientId={CLIENT_ID}
              buttonText='Login'
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy={'single_host_origin'}
              responseType='code,token'
              scope = { 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.heart_rate.read'}
            />
          }
        </Nav>
      </Navbar>
      <Dashboard user={user}/>
    </div>
  );
}

export default App;

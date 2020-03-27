import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import auth from './components/auth/auth';
import authData from './helpers/data/authData';
import myNavbar from './components/myNavbar/myNavbar';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
  $('body').on('mouseenter', '.farmer-card', (e) => e.target.closest('.card').classList.add('bg-info'));
  $('body').on('mouseleave', '.farmer-card', (e) => e.target.closest('.card').classList.remove('bg-info'));
};

init();

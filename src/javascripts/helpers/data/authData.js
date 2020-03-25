import firebase from 'firebase/app';
import 'firebase/auth';

import pasture from '../../components/pasture/pasture';

const authDiv = $('#auth');
const pastureDiv = $('#pasture');
const logoutButton = $('#navbar-logout-btn');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in
      authDiv.addClass('hide');
      pastureDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      pasture.buildCows();
    } else {
      // person is not logged in
      authDiv.removeClass('hide');
      pastureDiv.addClass('hide');
      logoutButton.addClass('hide');
    }
  });
};

export default { checkLoginStatus };

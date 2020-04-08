import cowData from '../../helpers/data/cowData';
import cowComponent from '../cow/cow';
import newCow from '../newCow/newCow';

import utils from '../../helpers/utils';
import smash from '../../helpers/data/smash';

const removeCow = (e) => {
  const cowId = e.target.closest('.card').id;
  // console.error('cowId', cowId);
  smash.completelyRemoveCow(cowId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildCows();
      utils.printToDom('single-farmer', '');
    })
    .catch((err) => console.error('could not delete cow', err));
};

const makeACow = (e) => {
  e.preventDefault();
  const addNewCow = {
    name: $('#cow-name').val(),
    breed: $('#cow-breed').val(),
    location: $('#cow-location').val(),
    weight: $('#cow-weight').val() * 1,
  };
  console.error('newCow', addNewCow);
  // make a new cow object
  // save to firebase
  cowData.addCow(addNewCow)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildCows();
      utils.printToDom('new-cow', '');
    })
    .catch((err) => console.error('add cow failed', err));
  // reprint cows
};

const buildCows = () => {
  cowData.getCows()
    .then((cows) => {
      let domString = '';
      domString += '<h2 class="text-center">Pasture</h2>';
      domString += '<div class="text-center"><button id="add-new-cow" class="btn btn-success m-3"><i class="fas fa-plus"></i></button></div>';
      domString += '<div class="d-flex flex-wrap">';
      cows.forEach((cow) => {
        domString += cowComponent.cowMaker(cow);
      });
      domString += '</div>';
      utils.printToDom('pasture', domString);
      $('body').on('click', '.delete-cow', removeCow);
      $('body').on('click', '#add-new-cow', newCow.showForm);
      $('body').on('click', '#cow-creator', makeACow);
    })
    .catch((err) => console.error('get cows broke', err));
};

export default { buildCows };

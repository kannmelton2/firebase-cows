import utils from '../../helpers/utils';
import cowData from '../../helpers/data/cowData';

const showForm = (cowId) => {
  cowData.getSingleCow(cowId)
    .then((resp) => {
      const cow = resp.data;
      let domString = '';
      domString += '<h2 class="text-center">New Cow</h2>';
      domString += `<form class="col-10 offset-1 edit-cow-form-tag" id="${cowId}">`;
      domString += '<div class="form-group">';
      domString += '<label for="edit-cow-name">Name</label>';
      domString += `<input type="text" class="form-control" id="edit-cow-name" aria-describedby="emailHelp" placeholder="Bessie" value="${cow.name}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-cow-breed">Breed</label>';
      domString += `<input type="text" class="form-control" id="edit-cow-breed" placeholder="Jersey" value="${cow.breed}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-cow-location">Location</label>';
      domString += `<input type="text" class="form-control" id="edit-cow-location" placeholder="On a Farm" value="${cow.location}">`;
      domString += '</div>';
      domString += '<div class="form-group">';
      domString += '<label for="edit-cow-weight">Weight (lbs)</label>';
      domString += `<input type="number" class="form-control" id="edit-cow-weight" placeholder="55" value="${cow.weight}">`;
      domString += '</div>';
      domString += '<button type="submit" id="cow-modifier" class="btn btn-dark">Modify Cow</button>';
      domString += '</form>';
      utils.printToDom('single-farmer', '');
      utils.printToDom('edit-cow', domString);
    })
    .catch((err) => console.error('could not get single cow', err));
};

export default { showForm };

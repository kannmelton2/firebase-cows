const farmMaker = (farmer) => {
  let domString = '';
  domString += '<div class="col-md-3">';
  domString += `<div class="card farmer-card" id="${farmer.id}">`;
  domString += `<div class="card-header">${farmer.name}</div>`;
  domString += '<div class="card-body">';
  domString += '<h5 class="card-title"></h5>';
  domString += `<p class="card-text">Age: ${farmer.age}</p>`;
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';

  return domString;
};

export default { farmMaker };

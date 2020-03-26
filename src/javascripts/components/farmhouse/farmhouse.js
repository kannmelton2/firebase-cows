import farmerData from '../../helpers/data/farmerData';
import farmerComponent from '../farmer/farmer';

import utils from '../../helpers/utils';

const buildFarmhouse = () => {
  farmerData.getFarmers()
    .then((farmers) => {
      let domString = '';
      domString += '<h2 class="text-center">Farmhouse</h2>';
      domString += '<div class="d-flex flex-wrap">';
      farmers.forEach((farmer) => {
        domString += farmerComponent.farmMaker(farmer);
      });
      domString += '</div>';
      utils.printToDom('farmhouse', domString);
    })
    .catch((err) => console.error('get farmers broke', err));
};

export default { buildFarmhouse };

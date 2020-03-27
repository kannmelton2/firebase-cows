import farmerData from './farmerData';
import farmerCowData from './farmerCowData';
import cowData from './cowData';

const getSingleFarmerWithCows = (farmerId) => new Promise((resolve, reject) => {
  farmerData.getFarmerbyId(farmerId)
    .then((response) => {
      const farmer = response.data;
      farmer.id = farmerId;
      farmer.cows = [];
      farmerCowData.getFarmerCowsByFarmerUid(farmer.uid).then((farmerCows) => {
        console.error('farmer cows', farmerCows);
        cowData.getCows().then((allCows) => {
          farmerCows.forEach((farmerCow) => {
            const cow = allCows.find((x) => x.id === farmerCow.cowId);
            farmer.cows.push(cow);
          });
        });
      });
      resolve(farmer);
    })
    .catch((err) => reject(err));
});

export default { getSingleFarmerWithCows };

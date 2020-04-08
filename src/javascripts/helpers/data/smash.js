import farmerData from './farmerData';
import farmerCowData from './farmerCowData';
import cowData from './cowData';

const getSingleFarmerWithCows = (farmerId) => new Promise((resolve, reject) => {
  farmerData.getFarmerById(farmerId)
    .then((response) => {
      const farmer = response.data;
      farmer.id = farmerId;
      farmer.cows = [];
      farmerCowData.getFarmerCowsByFarmerUid(farmer.uid).then((farmerCows) => {
        cowData.getCows().then((allCows) => {
          farmerCows.forEach((farmerCow) => {
            const cow = allCows.find((x) => x.id === farmerCow.cowId);
            farmer.cows.push(cow);
          });
          resolve(farmer);
        });
      });
    })
    .catch((err) => reject(err));
});

const completelyRemoveCow = (cowId) => new Promise((resolve, reject) => {
  cowData.deleteCow(cowId)
    .then(() => {
      farmerCowData.getFarmerCowsbyCowId(cowId)
        .then((farmerCows) => {
          farmerCows.forEach((fCow) => {
            farmerCowData.deleteFarmerCow(fCow.id);
          });
          resolve();
        });
    })
    .catch((err) => reject(err));
});

// in smash function - call getFarmerCows, getAllFarmers
// array of farmers, each farmer should have a boolean isChecked (true if that farmer owns the cow)
const getCowsWithOwners = () => new Promise((resolve, reject) => {
  cowData.getCows()
    .then((cowResponse) => {
      farmerData.getFarmers().then((farmerResponse) => {
        farmerCowData.getFarmerCows().then((farmerCowResponse) => {
          const finalCows = [];
          cowResponse.forEach((oneCow) => {
            const cow = { farmers: [], ...oneCow };
            const farmerCowOwners = farmerCowResponse.filter((x) => x.cowId === cow.id);
            farmerResponse.forEach((oneFarmer) => {
              const farmer = { ...oneFarmer };
              const isOwner = farmerCowOwners.find((x) => x.farmerUid === farmer.uid);
              farmer.isChecked = isOwner !== undefined;
              farmer.farmerCowId = isOwner ? isOwner.id : `nope-${cow.id}-${farmer.id}`;
              cow.farmers.push(farmer);
            });
            finalCows.push(cow);
          });
          resolve(finalCows);
        });
      });
    })
    .catch((err) => reject(err));
});
export default { getSingleFarmerWithCows, completelyRemoveCow, getCowsWithOwners };

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


// /*--------------------ISS SPOTTER 1--------------------*/
// //Invoke main function as a callback
// fetchMyIP((error, ip) => {
//   //Log a message if an error occurs
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   //Log the retreived IP address if successful
//   console.log('It worked! Returned IP:', ip);
// });
// /*--------------------ISS SPOTTER 2--------------------*/
// fetchCoordsByIP('104.158.136.19', (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:', data);
// });

// /*--------------------ISS SPOTTER 3--------------------*/
// const coordinates = { latitude: 43.2500208, longitude: -79.8660914 };
// fetchISSFlyOverTimes(coordinates, (error, data) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }

//   console.log('It worked! Returned flyover times:', data);
// });

/*--------------------ISS SPOTTER 4--------------------*/
//Print the times for each 
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

module.exports = {printPassTimes, nextISSTimesForMyLocation}
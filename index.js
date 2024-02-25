const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


//Invoke main function as a callback
fetchMyIP((error, ip) => {
  //Log a message if an error occurs
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  //Log the retreived IP address if successful
  console.log('It worked! Returned IP:', ip);
});

fetchCoordsByIP('104.158.136.19', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log('It worked! Returned coordinates:' , data);
});


const coordinates = { latitude: 43.2500208, longitude: -79.8660914 }
fetchISSFlyOverTimes(coordinates, (error, data) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log('It worked! Returned flyover times:' , data);
})

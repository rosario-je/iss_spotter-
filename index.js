const { fetchMyIP, fetchCoordsByIP } = require('./iss');


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




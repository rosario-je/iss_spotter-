const { fetchMyIP } = require('./iss');

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
const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  //Define the API endpoint for fetching the IP address
  const api = 'https://api.ipify.org?format=json';

  //Make API request to the IP address API
  request(api, (error, response, body) => {
    //If error occurrs, invoke the callback with error and null
    if (error) return callback(error, null);

    //If the response status code is not 200, construct an error message and invoke the callback with an error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
      //If the IP address is successfully retrieved, invoke the callback with null error and the IP address
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
      return;
    }
  });
};
module.exports = { fetchMyIP };
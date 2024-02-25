/*--------------------ISS SPOTTER 1--------------------*/

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
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    return;

  });
};

/*--------------------ISS SPOTTER 2--------------------*/

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    //If error occurrs, invoke the callback with error and null
    if (error) {
      callback(error, null);
      return;
    }
    const parsedBody = JSON.parse(body);
    //If the response status code is not 200, construct an error message and invoke the callback with an error
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    //Extract values by destructuring parsedBody
    const { latitude, longitude } = parsedBody;

    //Invoke callback
    callback(null, { latitude, longitude });

  });
};

/*--------------------ISS SPOTTER 3--------------------*/

/**
* Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
* Input:
*   - An object with keys `latitude` and `longitude`
*   - A callback (to pass back an error or the array of resulting data)
* Returns (via Callback):
*   - An error, if any (nullable)
*   - The fly over times as an array of objects (null if error). Example:
*     [ { risetime: 134564234, duration: 600 }, ... ]
*/
const fetchISSFlyOverTimes = (coords, callback) => {
  const api = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(api, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};



/*--------------------ISS SPOTTER 4--------------------*/

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ ;

 const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
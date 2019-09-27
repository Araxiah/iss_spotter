const request = require('request-promise-native');

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');

};

const fetchCoordsByIp = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextIssTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIp)
    .then(fetchFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextIssTimesForMyLocation };
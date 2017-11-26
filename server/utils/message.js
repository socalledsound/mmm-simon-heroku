// var moment = require('moment');

var generateMessage = (from, color, text) => {
  return {
    from,
    color,
    text,
    createdAt: 1
  };
};

// var generateLocationMessage = (from, latitude, longitude) => {
//   return {
//     from,
//     url: `https://www.google.com/maps?q=${latitude},${longitude}`,
//     createdAt: moment().valueOf()
//   };
// };

module.exports = {generateMessage};

const jwt = require('jsonwebtoken');


var data = {
    id:10
};


var token = jwt.sign(data, '123');

console.log(token);

var decoded = jwt.verify(token, '123');
console.log(decoded);
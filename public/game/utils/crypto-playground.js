const {SHA256}  =require("crypto-js");


var message = 'this is  a message';

var hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);



var data = {
    id: 4

}


var token = {
    data,
    hash : SHA256(JSON.stringify(data) + 'some-secret').toString()
};


token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'some-secret').toString();

if(resultHash === token.hash) {
    console.log("data ok");
}
else {
    console.log("failed");
}

"use strict";

var AWS = require("aws-sdk");
const middy = require('middy');
const { cors } = require('middy/middlewares');
const rek = new AWS.Rekognition();


const checkFaceFunc = (event, context, callback) => {
  const dataFile = event.body;
  const buffer = new Buffer(dataFile, 'base64');
  console.log('Data arrived');
  let params = {
    Image: {
		Bytes : buffer
	}
  };

 var result =  rek.detectFaces(params, function(err, data) {
   if (err) 
   { 
	console.log(err, err.stack); // an error occurred
	//return new Error(err);
   } else {    
   
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(data.FaceDetails),
	  };

    context.succeed(response);
	console.log(data);           // successful response
   return data;
 } 
})



};

const checkFace = middy(checkFaceFunc).use(cors());

module.exports = {checkFace};

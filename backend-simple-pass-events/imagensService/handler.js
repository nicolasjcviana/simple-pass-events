"use strict";

var AWS = require("aws-sdk");
var fileType = require("file-type");
var s3 = new AWS.S3();
const middy = require('middy');
const { cors } = require('middy/middlewares');

const uploadFilesFunc = (event, context, callback) => {
  const dataFile = event.body;
  console.log(event.pathParameters);
  console.log(dataFile);
  const buffer = new Buffer(dataFile, 'base64');
  const fileExt = fileType(buffer);
  
  const key = event.pathParameters.fileId;

  let params = {
    Bucket: 'simple-pass-images',
    Key: key,
    Body: buffer
  };

  s3.putObject(params, function(err, data) {
    if (err) {
      console.log('Error occurred on upload image: ', err);
    } else {
      console.log('File uploaded', data);
    }

  })
};

const uploadFile = middy(uploadFilesFunc).use(cors());

module.exports = {uploadFile};

'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const middy = require('middy');
const { cors } = require('middy/middlewares');
var s3 = new AWS.S3();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  data.id = uuid.v1();
  data.updatedAt = new Date().getTime();
  
  
  const dataFile = data.picture;
  const buffer = new Buffer(dataFile, 'base64');
 // const fileExt = fileType(buffer);
  
  let paramsS3 = {
    Bucket: 'simple-pass-images',
    Key: data.id,
    Body: buffer
  };

  s3.putObject(paramsS3, function(err, data) {
    if (err) {
      console.log('Error occurred on upload image: ', err);
    } else {
      console.log('File uploaded', data);
    }
  })
   
  data.picture = undefined;
  
  const params = {
    TableName: 'users',
    Item: data
  };

  return dynamoDb.put(params, (error, data) => {
	  console.log(error);
	  
    if (error) {
      callback(error);
    }
    callback(error, params.Item);
  });
};
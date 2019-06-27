'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
const bucket = 'simple-pass-images';
var s3 = new AWS.S3();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  data.id = uuid.v1();
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'event',
    Item: data
  };

  const dataFile = data.picture;
  const buffer = new Buffer(dataFile, 'base64');
 // const fileExt = fileType(buffer);
  
  let paramsS3 = {
    Bucket: bucket,
    Key: data.id,
    Body: buffer
  };
  data.picture = null;

  s3.putObject(paramsS3, function(err, datas3) {
    if (err) {
      console.log('Error occurred on upload image: ', err);
    } else {
      console.log('File uploaded', datas3);
      console.log('File uploaded', data.id);
    }
  })

  return dynamoDb.put(params, (error, data) => {
	  console.log(error);
	  
    if (error) {
      callback(error);
    }
    callback(error, params.Item);
  });
};

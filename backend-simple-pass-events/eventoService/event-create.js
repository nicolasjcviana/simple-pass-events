'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  data.id = uuid.v1();
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'event',
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
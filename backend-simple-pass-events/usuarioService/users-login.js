"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");
var s3 = new AWS.S3();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);
  console.log("Data", data);

  const params = {
    TableName: "users",
    FilterExpression: "cpf = :cpf",
    ExpressionAttributeValues: {
      ":cpf": data.cpf
    }
  };


  return dynamoDb.scan(params, (error, data) => {
    console.log('chou', params, data);
    if (error) {
      console.log('ERRORrr', error)
      callback(error);
    }
    callback(error, data);
  });
};

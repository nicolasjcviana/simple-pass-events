"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid");
const middy = require("middy");
const { cors } = require("middy/middlewares");
var s3 = new AWS.S3();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "users",
    FilterExpression: "cpf = :cpf and (attribute_not_exists(password) or password = :pass)",
    ExpressionAttributeValues: {
      ":cpf": data.cpf,
      ":pass": data.pass
    }
  };

  return dynamoDb.get(params, (error, data) => {
    console.log(params, data);
    if (error) {
      callback(error);
    }
    callback(error, data);
  });
};

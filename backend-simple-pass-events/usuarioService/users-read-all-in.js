"use strict";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const data = JSON.parse(event.body);

  var titleObject = {};
  var index = 0;
  data.ids.forEach(function(value) {
    index++;
    var key = ":key" + index;
    titleObject[key.toString()] = value;
  });

  const params = {
    TableName: "users",
    FilterExpression: "id IN (" + Object.keys(titleObject).toString() + ")",
    ExpressionAttributeValues: titleObject
  };

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      callback(error);
    }
    callback(error, data.Items);
  });
};

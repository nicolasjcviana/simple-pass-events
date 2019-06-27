'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
var s3 = new AWS.S3();
const bucket = 'simple-pass-images';

module.exports = (event, callback) => {
  const params = {
    TableName: 'event',
  };

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      callback(error);
    }


    var index = 0;
    data.Items.forEach(evento => {
      return s3.getObject({
        Bucket: bucket,
        Key: evento.id
      }, function (err, datas3) {
        if (err) {
          //Not found
        } else {
          
          let base64data = datas3.Body.toString('base64');
          evento.picture = base64data;
          console.log('achei', evento.id);
        }
        index++;
        if(index === data.Items.length){
          callback(error, data.Items);
        }
      });
    });
    console.log('response')

  });
};

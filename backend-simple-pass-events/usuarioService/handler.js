'use strict';

const usersCreate = require('./users-create.js');
const usersReadAll = require('./users-read-all.js');
const usersReadAllIn = require('./users-read-all-in.js');
const usersReadOne = require('./users-read-one.js');
const usersUpdate = require('./users-update.js');
const usersDelete = require('./users-delete.js');
const usersLogin = require('./users-login.js');

const imageRecog = require('./imageRecog.js');

module.exports.create = (event, context, callback) => {
  usersCreate(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readAll = (event, context, callback) => {
  usersReadAll(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.readOne = (event, context, callback) => {
  usersReadOne(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.update = (event, context, callback) => {
  usersUpdate(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

    context.succeed(response);
  });
};

module.exports.delete = (event, context, callback) => {
  usersDelete(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

   context.succeed(response);
  });
};

module.exports.login = (event, context, callback) => {
  usersLogin(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

   context.succeed(response);
  });
};

module.exports.readAllIn = (event, context, callback) => {
  usersReadAllIn(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

   context.succeed(response);
  });
};

module.exports.search_face = (event, context, callback) => {
  imageRecog.search_face(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

   context.succeed(response);
  });
};
module.exports.deleteFace = (event, context, callback) => {
  imageRecog.deleteFace(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

   context.succeed(response);
  });
};
module.exports.indexFaces = (event, context, callback) => {
  imageRecog.indexFaces(event, (error, result) => {
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*"
      },
      body: JSON.stringify(result),
    };

   context.succeed(response);
  });
};
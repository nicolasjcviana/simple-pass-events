const config = {collectionName: 'rekVideoEvent'};

const AWS = require('aws-sdk');

var rekognition = new AWS.Rekognition();

//set defaut obj to return results data
var objReturn = {
	found: false,
	resultAWS:''
}

search_face = function(obj, callback){
	const dataFile = event.body;
	console.log("Find face ...")
	
	rekognition.searchFacesByImage({
	 	"CollectionId": config.collectionName,
	 	"FaceMatchThreshold": 70, //set minumum match in image send
	 	"Image": {
			'Bytes': new Buffer(dataFile, 'base64')
	 	},
	 	"MaxFaces": 1 // set the number face detect in image send
	}, function(err, data) {
	 	if (err) {
			console.log(err)
			callback(err);
	 	} else { 
			if(data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face)
			{
				console.log(data.FaceMatches[0].Face)
				callback (data.FaceMatches[0].Face);	
			} else {
				objReturn.found = false
				callback (objReturn);	
			}
		}
	});
}

indexFaces = function (obj,callback){
	
	console.log("Index new image face ...")

	rekognition.indexFaces({
		"CollectionId": config.collectionName,
		"DetectionAttributes": [ "ALL" ], // set detect all atributes on image send.
		"ExternalImageId": obj.id_user, 
		"Image": { 
			'Bytes': new Buffer(obj.photo, 'base64')
		}
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
			
			objReturn.found = false
			objReturn.resultAWS = err, err.stack
			callback(objReturn)
		} else {
			console.log(data.FaceRecords[0].Face); // successful response

			objReturn.found = true
			objReturn.resultAWS = data.FaceRecords[0].Face
			callback(objReturn)
		}
	});

}

deleteFace = function (obj,callback){

	console.log("Delete image face ...")
	
	//prepare params to delete face index.
	var params_deletion = {CollectionId: config.collectionName, FaceIds: [obj.face_id]};

	rekognition.deleteFaces(params_deletion, function(err, data) {
		if (err) callback(err, err.stack);  // an error occurred
		else     callback(true,data);      // successful response
	});
}
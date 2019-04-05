const Rekognition = require('node-rekognition')
 
// Set your AWS credentials
const AWSParameters = {
    "accessKeyId": "XXX",
    "secretAccessKey": "XXX",
    "region": "XXX",
    "bucket": "XXX",
    "ACL": "XXX" // optional
}

//https://www.npmjs.com/package/node-rekognition

const rekognition = new Rekognition(AWSParameters)


/**
 * Upload image or images array to S3 bucket into specified folder
 *
 * @param {Array.<string>|string} imagePaths 
 * @param {string} folder a folder name inside your AWS S3 bucket (it will be created if not exists)
 */
const s3Images = await rekognition.uploadToS3(imagePaths, folder)


/**
 * Compares a face in the source input image with each face detected in the target input image
 *
 * @param {Object|Buffer} sourceImage 
 * @param {Object|Buffer} targetImage 
 * @param {string} threshold (optional. Defaults 90)
 */
const faceMatches = await rekognition.compareFaces(sourceImage, targetImage, threshold)

import formidable from "formidable";
import dotenv from "dotenv";
import process from "node:process"

dotenv.config({ silent: process.env });

import { S3Util,HttpException,HttpResponse } from "../../utils/index.js";



const s3Utils = new S3Util(
    process.env.AWSREGION,
    process.env.AWSACCESSKEYID,
    process.env.AWSSECRETKEY,
    process.env.AWSAPIVERSION,
    process.env.ASSETSBUCKET
);
import aws from "aws-sdk";
const s3 = new aws.S3();
const options = { keepExtensions: true };
const assetsBucket = process.env.ASSETSBUCKET;
const uncompressedAssetsBucket = process.env.UNCOMPRESSEDASSETSBUCKET;
const imageFolder = "images";
const videoFolder = "videos";
const documentsFolder = "documents";


aws.config.update({ accessKeyId: process.env.AWSACCESSKEYID, secretAccessKey: process.env.AWSSECRETKEY });

class AssetUploadController {
    
   
     uploadSingleImage(  request, response, next ) {
        try {
            const form = new formidable.IncomingForm(options);
            form.parse(request, async (err, fields, files) => {
                if (err) {
                    next(err);
                } else {
                    if (files.file.size > 5242880) {
                        return next(new HttpException(400, "You cannot upload image larger than 5Mb"));
                    }
                    console.log(files.file.size, imageFolder)
                    s3Utils.singleFileUpload(files.file, imageFolder, async (err, result) => {
                       
                        if (err) {
                            next(err);
                        } else {

                            result.Location = result.Location.replace(uncompressedAssetsBucket, assetsBucket);
                            const imageData = {
                                url: result.Location,
                                name: Object.keys(files)[0],
                                size: files.file.size,
                                type: files.file.type,
                            };


                            console.log("###########3 videoData :: ",imageData);

                            // Print Error from S3
                            const getParams = {
                                Bucket: assetsBucket,
                                Key: result.Key
                            };
                            
                            let compressedObject = null;
                            
                            do {
                                try {
                                    compressedObject = await s3.getObject(getParams).promise();
                                } catch (err) {
                                    compressedObject = null;
                                }
                            } while (compressedObject == null || compressedObject == undefined);
                            // Returning the response
                            response.status(200).send(new HttpResponse("Upload Image", imageData, "Image Uploaded", null, null, null));
                        }
                    },
                        uncompressedAssetsBucket
                    );
                }
            });

        } catch (err) {
            next(new HttpException(400, "Something went wrong"));
        }
    }

     

}

export default new AssetUploadController();
import AWS from "aws-sdk";

export const uploadFiles = async (filename, data) => {
	const BUCKET_NAME = process.env.BUCKET_NAME;
	const IAM_USER_KEY = process.env.IAM_USER_KEY;
	const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

	let s3bucket = new AWS.S3({
		accessKeyId: IAM_USER_KEY,
		secretAccessKey: IAM_USER_SECRET,
	});

	var params = {
		Bucket: BUCKET_NAME,
		Key: filename,
		Body: data,
		ACL: "public-read",
	};

	try {
		await s3bucket.putObject(params).promise();
		return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
	} catch (err) {
		console.log(err);
	}
};

export const deleteFiles = async (fileName) => {
	const BUCKET_NAME = process.env.BUCKET_NAME;
	const IAM_USER_KEY = process.env.IAM_USER_KEY;
	const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

	let s3bucket = new AWS.S3({
		accessKeyId: IAM_USER_KEY,
		secretAccessKey: IAM_USER_SECRET,
	});

	var params = {
		Bucket: BUCKET_NAME,
		Key: fileName,
	};

	try {
		let result = await s3bucket.deleteObject(params).promise();
		console.log(result);
	} catch (err) {
		console.log(err);
	}
};

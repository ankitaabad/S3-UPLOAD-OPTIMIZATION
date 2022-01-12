//@ts-check
const AWS = require("aws-sdk");
const fs = require("fs");
const fs_promise = fs.promises;
const s3 = new AWS.S3();

const single_part = async (filepath) => {
  const Body = await fs_promise.readFile(filepath);
  await s3.putObject({
    Bucket: process.env.excel_upload_bucket,
    Key: filepath,
    ContentType: "text/plain",
    Body,
  }).promise();
};

const multipart = async (filepath) => {
  const Body = await fs_promise.readFile(filepath);
  await s3.upload(
    {
      Bucket: process.env.excel_upload_bucket,
      Key: filepath,
      Body,
      ContentType: "text/plain"    },
    {
      queueSize: 4,
    }
  ).promise();
};

const multipart_with_stream = async (filepath) => {
  await s3.upload(  {
    Bucket: process.env.excel_upload_bucket,
    Key: filepath,
    Body: fs.createReadStream(filepath),
    ContentType: "text/plain"
  },
  {
    queueSize: 4,
  }).promise()
};

module.exports =  { single_part, multipart, multipart_with_stream };

const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const keys = require("../configs/keys");
const RequestValidationError = require("../errors/RequestValidationError");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: "us-east-2",
});

const router = express.Router();

router.get("/api/upload", async (req, res) => {
  const { fileType } = req.query;

  if (!fileType) {
    throw new RequestValidationError([
      { msg: "filetype required", field: "file" },
    ]);
  }

  const fileExt = fileType.substring(fileType.indexOf("/") + 1);

  const key = `${uuidv4()}.${fileExt}`;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "dreamschool-image-bucket-jc",
      ContentType: fileType,
      Key: key,
    },
    (err, url) => {
      res.send({ key, url });
    }
  );
});

module.exports = router;

//@ts-check

const express = require('express');
const {fake_data} = require('./utils/fake-data');
const fs = require('fs');
const serverless = require('serverless-http');
const {single_part,multipart,multipart_with_stream} = require("./utils/strategy");
const app = express();
app.get("/single_part", async (_req, res) => {
  const filepath = await fake_data(200);
  await single_part(filepath);
  await fs.unlinkSync(filepath);
  res.send("SUCCESS");
});

app.get("/multipart", async (_req, res) => {
  const filepath = await fake_data(200);
  await multipart(filepath);
  await fs.unlinkSync(filepath);
  res.send("SUCCESS");
});

app.get("/multipart_with_stream", async (_req, res) => {
  const filepath = await fake_data(200);
  await multipart_with_stream(filepath);
  await fs.unlinkSync(filepath);
  res.send("SUCCESS");
});
const handler = serverless(app);
module.exports =  {handler};

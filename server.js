const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getModelResponse } = require("./utils/getModelResponse");
const { getModelPrompt } = require("./utils/getModelPrompt");
const Offer = require("./modals/offer");

dotenv.config({ path: "./config.env" });

require("./db/connection");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  const allOffers = await Offer.find();
  res.json(allOffers);
});

app.post("/", async (req, res) => {
  const parsedEmailData = req.body;
  const modelPrompt = getModelPrompt(parsedEmailData);
  console.log("Model processing started for email: ", parsedEmailData.Subject);
  const modelResult = await getModelResponse(modelPrompt);
  if (modelResult) {
    await Offer.insertOne(modelResult);
    console.log("Added:\n", modelResult);
  }
  res.json(modelResult);
});

app.listen(process.env.PORT, () => {
  console.log(
    `Application is running on: http://localhost:${process.env.PORT}`
  );
});

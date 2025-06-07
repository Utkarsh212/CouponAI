const axios = require("axios");
const dotenv = require("dotenv");
const { parseModelResult } = require("./parseModelResult");

dotenv.config({ path: "./config.env" });

async function getModelResponse(content) {
  let data = JSON.stringify({
    model: process.env.MODEL,
    format: "json",
    messages: [
      {
        role: "user",
        content,
      },
    ],
    stream: false,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.HOSTED_MODEL_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let result = undefined;

  try {
    const response = await axios.request(config);
    result = parseModelResult(response.data);
  } catch (error) {
    console.log(error);
  }
  return result;
}

module.exports = {
  getModelResponse,
};
